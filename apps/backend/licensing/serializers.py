from rest_framework import serializers


class LicenseActivateSerializer(serializers.Serializer):
    key = serializers.CharField(max_length=255)
    machine_id = serializers.CharField(max_length=64, required=False)
