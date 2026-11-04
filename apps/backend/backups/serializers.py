from rest_framework import serializers
from .models import SystemBackup, ShopBackup


class SystemBackupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemBackup
        fields = '__all__'
        read_only_fields = ['created_at', 'completed_at']


class ShopBackupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopBackup
        fields = '__all__'
        read_only_fields = ['created_at', 'completed_at']
