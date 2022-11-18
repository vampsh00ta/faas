from web3 import Web3,HTTPProvider
import requests
import json
from dateutil.relativedelta import relativedelta
from datetime import datetime
from  django.conf import settings
import re
import aiohttp
from .models import BannedWallet
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
    async def all_reqs(self,wallet):
        async with aiohttp.ClientSession() as session:

            self.transactions_txlist = await self.fetch(session,
                self.make_api_url(module="account", action='txlist', address=wallet, sort='desc'))

            self.transactions_tokentx =await self.fetch(session,
                self.make_api_url(module="account", action='tokentx', address=wallet, sort='desc'))

            self.transactions_txlistinternal =await self.fetch(session,
                self.make_api_url(module="account", action='txlistinternal', address=wallet, sort='desc'))

            self.tokens =await self.fetch(session,f'https://api.ethplorer.io/getAddressInfo/{wallet}?apiKey=freekey')

            # self.dune_id =await self.fetch(session,self.dune_url, {'content-type': 'application/json','x-hasura-api-key':''},
            #                         # {"operationName": "GetResult", "variables": {"query_id": 5866, "parameters": []},"query": "query GetResult($query_id: Int!, $parameters: [Parameter!]!) {\n  get_result_v3(query_id: $query_id, parameters: $parameters) {\n    job_id\n    result_id\n    error_id\n    __typename\n  }\n}\n"})
            #                                {"operationName": "GetResult",
            #                                 "variables": {"query_id": 5866, "parameters": []},
            #                                 "query": "query GetResult($query_id: Int!, $parameters: [Parameter!]!) {\n  get_result_v3(query_id: $query_id, parameters: $parameters) {\n    job_id\n    result_id\n    error_id\n    __typename\n  }\n}\n"})

    def is_checksum_address(self,address):
        address = address.replace('0x', '')
        address_hash = keccak.new(digest_bits=256)
        address_hash = address_hash.update(address.lower().encode('utf-8')).hexdigest()

        for i in range(0, 40):
            if ((int(address_hash[i], 16) > 7 and address[i].upper() != address[i]) or
                    (int(address_hash[i], 16) <= 7 and address[i].lower() != address[i])):
                return False
        return True

    def is_address(self,address):
        if not re.match(r'^(0x)?[0-9a-f]{40}$', address, flags=re.IGNORECASE):
            return False
        elif re.match(r'^(0x)?[0-9a-f]{40}$', address) or re.match(r'^(0x)?[0-9A-F]{40}$', address):
            return True
        else:
            return self.is_checksum_address(address)
    def make_api_url(self,module, action, **kwargs):
        url = self.BASE_URL + f"?module={module}&action={action}&apikey={self.API_KEY}"

        for key, value in kwargs.items():
            url += f"&{key}={value}"
        return url

    def handle_response(self, response:dict,wallet:str):

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

        ban = BannedWallet.objects.filter(wallet = wallet)
        try:
            if ban:
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
        loop.run_until_complete(self.all_reqs(wallet))
        txes = self.get_tx(wallet)
        wallet = wallet.lower()
        result_turnover = {
            'balanceNow': self.getTokens(wallet),
            'banned': False,
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
