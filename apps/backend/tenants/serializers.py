from rest_framework import serializers
from .models import Tenant, Shop

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'
from .models import DomainRequest

class DomainRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DomainRequest
        fields = '__all__'
