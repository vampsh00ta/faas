from rest_framework import serializers
from .models import BannedWallet


class BannedWalletModelSerializer(serializers.ModelSerializer):

    class Meta:
        model = BannedWallet
        fields = '__all__'
