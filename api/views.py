from django.shortcuts import render
from  rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import  status
from . import crypto_fetch
import  threading
class GetWalletInfo(APIView):
    def get(self,request,format = None):
        wallet = request.GET["wallet"]
        if wallet:
            info = crypto_fetch.eth.getInfo(wallet)
            print(info)
            if isinstance(info,dict):

                return Response(info,status.HTTP_200_OK)
            else:
                Response({"success": False,"error": "Unknown error"})
        else:
            return Response({"success": False,"error": "Invalid wallet"}, status=status.HTTP_400_BAD_REQUEST)
