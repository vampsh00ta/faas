from django.shortcuts import render
from  rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import  status
from .models import BannedWallet,transaction
from .serializer import BannedWalletModelSerializer
from . import crypto_fetch
from datetime import datetime
import  threading
class GetWalletInfo(APIView):
    def get(self,request,format = None):
        wallet = request.GET["wallet"]
        if crypto_fetch.eth.is_address(wallet):
            info = crypto_fetch.eth.getInfo(wallet)
            if isinstance(info,dict):

                return Response(info,status.HTTP_200_OK)
            else:
                Response({"success": False,"error": "Unknown error"})
        else:
            return Response({"success": False,"error": "Invalid wallet"}, status=status.HTTP_400_BAD_REQUEST)
class BannedWallets(APIView):
    def get(self,request):
        query = BannedWallet.objects.all()
        print(query)
        serializer = BannedWalletModelSerializer(query,many=True)
        return Response(serializer.data,status = status.HTTP_200_OK)
    def post(self,request):
        data = request.data
        tx = data.get('tx', None)
        wallet = data.get('wallet', None)
        reason = data.get('reason', None)
        banned_by = data.get('banned_by', None)
        with transaction.atomic():
            obj, created = BannedWallet.objects.get_or_create(
                tx=tx,
                date=datetime.now(),
                wallet=wallet,
                reason=reason,
                banned_by=banned_by,

            )
            if created:
                return Response({'status':'done'})
            return Response({'status':'query exists'})