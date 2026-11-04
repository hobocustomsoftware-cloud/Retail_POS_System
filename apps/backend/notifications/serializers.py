from rest_framework import serializers
from .models import Notification, PushDevice


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'
        read_only_fields = ['created_at', 'read_at', 'is_pushed']


class PushDeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PushDevice
        fields = '__all__'
        read_only_fields = ['created_at', 'last_used_at']
