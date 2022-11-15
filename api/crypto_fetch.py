from web3 import Web3,HTTPProvider
import requests
import json
from dateutil.relativedelta import relativedelta
from datetime import datetime
from  django.conf import settings
import re
import aiohttp
import asyncio
from Crypto.Hash import keccak
import time
class EthModule(object):
    dune_url =  'https://core-hsr.dune.com/v1/graphql'

    TOKEN_VALUE = 10 ** 18
    USDT_VALUE = 10 ** 6
    transactions = dict()
    requests_results = dict()
    COIN_GECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'

    def __init__(self,httpprovider,api_key,base_url):
        self.web3 = Web3(HTTPProvider(httpprovider))
        self.API_KEY = api_key
        self.BASE_URL = base_url

    async def fetch(self,session, *args):
        params =  list(args)
        if len(params) == 3:
            async with session.post(url = params[0],headers = params[1],data = json.dumps(params[2])) as response:
                return await response.json()
        async with session.get(url=params[0]) as response:
            return await response.json()
    async def req(self,wallet):
        async with aiohttp.ClientSession() as session:

            self.transactions_txlist = await self.fetch(session,
                self.make_api_url(module="account", action='txlist', address=wallet, sort='desc'))

            self.transactions_tokentx =await self.fetch(session,
                self.make_api_url(module="account", action='tokentx', address=wallet, sort='desc'))

            self.transactions_txlistinternal =await self.fetch(session,
                self.make_api_url(module="account", action='txlistinternal', address=wallet, sort='desc'))

            self.tokens =await self.fetch(session,f'https://api.ethplorer.io/getAddressInfo/{wallet}?apiKey=freekey')

            self.dune_id =await self.fetch(session,self.dune_url, {'content-type': 'application/json','x-hasura-api-key':''},
                                    # {"operationName": "GetResult", "variables": {"query_id": 5866, "parameters": []},"query": "query GetResult($query_id: Int!, $parameters: [Parameter!]!) {\n  get_result_v3(query_id: $query_id, parameters: $parameters) {\n    job_id\n    result_id\n    error_id\n    __typename\n  }\n}\n"})
                                           {"operationName": "GetResult",
                                            "variables": {"query_id": 5866, "parameters": []},
                                            "query": "query GetResult($query_id: Int!, $parameters: [Parameter!]!) {\n  get_result_v3(query_id: $query_id, parameters: $parameters) {\n    job_id\n    result_id\n    error_id\n    __typename\n  }\n}\n"})

    def is_checksum_address(self,address):
        address = address.replace('0x', '')
        address_hash = keccak.new(digest_bits=256)
        address_hash = address_hash.update(address.lower().encode('utf-8')).hexdigest()

        for i in range(0, 40):
            # The nth letter should be uppercase if the nth digit of casemap is 1
            if ((int(address_hash[i], 16) > 7 and address[i].upper() != address[i]) or
                    (int(address_hash[i], 16) <= 7 and address[i].lower() != address[i])):
                return False
        return True

    def is_address(self,address):
        if not re.match(r'^(0x)?[0-9a-f]{40}$', address, flags=re.IGNORECASE):
            # Check if it has the basic requirements of an address
            return False
        elif re.match(r'^(0x)?[0-9a-f]{40}$', address) or re.match(r'^(0x)?[0-9A-F]{40}$', address):
            # If it's all small caps or all all caps, return true
            return True
        else:
            # Otherwise check each case
            return self.is_checksum_address(address)
    def make_api_url(self,module, action, **kwargs):
        url = self.BASE_URL + f"?module={module}&action={action}&apikey={self.API_KEY}"

        for key, value in kwargs.items():
            url += f"&{key}={value}"
        return url

    def handle_response(self, response:dict,wallet:str):
        # transactions_url = self.make_api_url(module="account", action=action, address=wallet, sort='desc')
        #
        # response = requests.get(transactions_url).json()['result']
        data = response['result']

        for tx in data:
            hash = tx['hash']
            value = int(tx['value'])
            self.transactions[tx['hash']] = {
                'currency': None,
                'value':None,
                'from': None,
                'to': None,
                'timeStamp': None
            }
            try:
                self.transactions[hash]['currency'] = tx['tokenSymbol']
                if tx['tokenSymbol'] == 'USDT':
                    self.transactions[hash]['value'] = value / self.USDT_VALUE
                else:
                    self.transactions[hash]['value'] = value / self.TOKEN_VALUE

            except:
                self.transactions[hash]['currency'] = 'ETH'
                self.transactions[hash]['value'] = value / self.TOKEN_VALUE
            self.transactions[hash]['from'] = tx['from']
            self.transactions[hash]['to'] = tx['to']
            self.transactions[hash]['timeStamp'] = tx['timeStamp']

    def get_tx(self,wallet:str)->dict:
        self.handle_response(response=self.transactions_txlist,wallet = wallet)
        self.handle_response(response=self.transactions_tokentx,wallet = wallet)
        self.handle_response(response=  self.transactions_txlistinternal,wallet = wallet)

        return  self.transactions

    def getTokens(self,wallet:str)->dict:
        # response =requests.get(url = f'https://api.ethplorer.io/getAddressInfo/{wallet}?apiKey=freekey')
        # handaled_response = response.json()
        handaled_response = self.tokens

        data = {
            'ETH':handaled_response['ETH']['balance']
        }
        tokens = list(filter(lambda d: d['tokenInfo']['price'] != False, handaled_response['tokens']))
        for token in tokens:
            token_name = token['tokenInfo']['symbol']
            if token_name == 'USDT':
                token_balance = int(token['balance'])/self.USDT_VALUE
            else:
                token_balance = int(token['balance'])/self.TOKEN_VALUE
            data[token_name] = token_balance

        return data


    def isBanned(self,wallet:str)->str:
        # isBanned =   requests.get(self.dune_url,{'content-type': 'application/json'},{"operationName": "GetResult", "variables": {"query_id": 5866, "parameters": []},"query": "query GetResult($query_id: Int!, $parameters: [Parameter!]!) {\n  get_result_v3(query_id: $query_id, parameters: $parameters) {\n    job_id\n    result_id\n    error_id\n    __typename\n  }\n}\n"})

        # result_id = isBanned.json()['data']['get_result_v3']['result_id']
        result_id = self.dune_id['data']['get_result_v3']['result_id']
        try:
            response =requests.post(
                url = self.dune_url,
                headers={'content-type': 'application/json',"x-hasura-api-key":''},
                # data = json.dumps({"operationName":"FindResultDataByResult","variables":{"result_id":result_id,"error_id":"00000000-0000-0000-0000-000000000000"},"query":"query FindResultDataByResult($result_id: uuid!, $error_id: uuid!) {\n  query_results(where: {id: {_eq: $result_id}}) {\n    id\n    job_id\n    runtime\n    generated_at\n    columns\n    __typename\n  }\n  query_errors(where: {id: {_eq: $error_id}}) {\n    id\n    job_id\n    runtime\n    message\n    metadata\n    type\n    generated_at\n    __typename\n  }\n  get_result_by_result_id(args: {want_result_id: $result_id}) {\n    data\n    __typename\n  }\n}\n"})
                data = json.dumps({"operationName":"GetExecution","variables":{"execution_id":result_id,"query_id":5866,"parameters":[]},"query":"query GetExecution($execution_id: String!, $query_id: Int!, $parameters: [Parameter!]!) {\n  get_execution(\n    execution_id: $execution_id\n    query_id: $query_id\n    parameters: $parameters\n  ) {\n    execution_queued {\n      execution_id\n      execution_user_id\n      position\n      execution_type\n      created_at\n      __typename\n    }\n    execution_running {\n      execution_id\n      execution_user_id\n      execution_type\n      started_at\n      created_at\n      __typename\n    }\n    execution_succeeded {\n      execution_id\n      runtime_seconds\n      generated_at\n      columns\n      data\n      __typename\n    }\n    execution_failed {\n      execution_id\n      type\n      message\n      metadata {\n        line\n        column\n        hint\n        __typename\n      }\n      runtime_seconds\n      generated_at\n      __typename\n    }\n    __typename\n  }\n}\n"})
                )
            wallets = response.json()['data']['get_execution']['execution_succeeded']['data']
            if list(filter(lambda d: d['banned_addresses'] == wallet, wallets)):
                return True
            return False
        except Exception as e:
            return 'failed to get data'

    def __add_to_turnover(self,result,txes,tx,wallet):
        currency = txes[tx]['currency']
        if txes[tx]['from'] == wallet:
            try:
                result['outcome'][currency] += txes[tx]['value']
            except:
                result['outcome'][currency] = txes[tx]['value']
        elif txes[tx]['to'] == wallet:
            try:
                result['income'][currency] += txes[tx]['value']
            except:
                result['income'][currency] = txes[tx]['value']
        return  result
    def getInfo(self,wallet:str = None)->dict:
        loop = asyncio.new_event_loop()
        loop.run_until_complete(self.req(wallet))
        txes = self.get_tx(wallet)
        wallet = wallet.lower()
        result_turnover = {
            'balanceNow': self.getTokens(wallet),
            'banned': self.isBanned(wallet),
            'month':{},
            'year':{},
            'wholetime':{}
        }
        datenow = datetime.now()
        result = {
            'income':{},
            'outcome':{},
        }
        try:
            for tx in txes:
                timestamp = txes[tx]['timeStamp']
                date = datetime.fromtimestamp(int(timestamp))
                if date > datenow - relativedelta(months=1):
                    result_turnover['month'] = self.__add_to_turnover(result,txes,tx,wallet)
                elif  date > datenow - relativedelta(months=12):
                    result_turnover['year'] = self.__add_to_turnover(result, txes, tx, wallet)
                elif date < datenow - relativedelta(months=12):
                    result_turnover['wholetime'] = self.__add_to_turnover(result, txes, tx, wallet)
            return result_turnover
        except Exception as e:
            return False
eth = EthModule(settings.NET, settings.ETH_API_KEY,settings.API_ETH_BASE_URL)
#
# eth = EthModule('https://mainnet.infura.io/v3/2341e0371fbc4f008679f0e890a36044', 'RHCTJPJ811MD3QYBCQ134WBXQT6DSA7CXW','https://api.etherscan.io/api')
# # loop = asyncio.get_event_loop()
# # loop.run_until_complete(eth.req('0xce479Ff6fDdC5E162861375E0A230357c101F22e'))
# start = time.time()
# print(eth.getInfo('0xce479Ff6fDdC5E162861375E0A230357c101F22e'))
# end = time.time()
# print(end - start)