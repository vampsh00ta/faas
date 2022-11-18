from celery import shared_task
from celery.utils.log import get_task_logger
import requests


from .models import transaction,BannedWallet
import json
from datetime import datetime

logger = get_task_logger(__name__)



@shared_task
def getBanned():
    with transaction.atomic():
        dune_url = 'https://core-hsr.dune.com/v1/graphql'
        try:
            isBanned = requests.post(
                url=dune_url,
                headers={'content-type': 'application/json'

                                              },
                data=json.dumps({"operationName": "GetResult", "variables": {"query_id": 5866, "parameters": []},
                     "query": "query GetResult($query_id: Int!, $parameters: [Parameter!]!) {\n  get_result_v3(query_id: $query_id, parameters: $parameters) {\n    job_id\n    result_id\n    error_id\n    __typename\n  }\n}\n"}))
            dune_id = isBanned.json()['data']['get_result_v3']['result_id']

            response = requests.post(
                url=dune_url,
                headers={'content-type': 'application/json', "x-hasura-api-key": ''},
                data=json.dumps({"operationName": "GetExecution",
                                 "variables": {"execution_id": dune_id, "query_id": 5866, "parameters": []},
                                 "query": "query GetExecution($execution_id: String!, $query_id: Int!, $parameters: [Parameter!]!) {\n  get_execution(\n    execution_id: $execution_id\n    query_id: $query_id\n    parameters: $parameters\n  ) {\n    execution_queued {\n      execution_id\n      execution_user_id\n      position\n      execution_type\n      created_at\n      __typename\n    }\n    execution_running {\n      execution_id\n      execution_user_id\n      execution_type\n      started_at\n      created_at\n      __typename\n    }\n    execution_succeeded {\n      execution_id\n      runtime_seconds\n      generated_at\n      columns\n      data\n      __typename\n    }\n    execution_failed {\n      execution_id\n      type\n      message\n      metadata {\n        line\n        column\n        hint\n        __typename\n      }\n      runtime_seconds\n      generated_at\n      __typename\n    }\n    __typename\n  }\n}\n"})
            )
            wallets = response.json()['data']['get_execution']['execution_succeeded']['data']
            for wallet in wallets:
                obj, created = BannedWallet.objects.get_or_create(
                    tx=wallet['tx'],
                    date=wallet['ban_time'],
                    wallet=wallet['banned_addresses'],
                )
            return True
        except Exception as e:
            return e



