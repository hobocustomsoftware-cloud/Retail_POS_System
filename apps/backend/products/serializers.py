from rest_framework import serializers
from .models import Product, ProductVariant, Attribute, AttributeValue
from utils.barcode import generate_barcode, generate_sku

class AttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeValue
        fields = '__all__'

class AttributeSerializer(serializers.ModelSerializer):
    values = AttributeValueSerializer(many=True, read_only=True)
    class Meta:
        model = Attribute
        fields = '__all__'

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = '__all__'
        read_only_fields = ('barcode', 'sku')

    def create(self, validated_data):
        if not validated_data.get('sku'):
            validated_data['sku'] = generate_sku()
        if not validated_data.get('barcode'):
            validated_data['barcode'] = generate_barcode()
        return super().create(validated_data)

class ProductSerializer(serializers.ModelSerializer):
    variants = ProductVariantSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = '__all__'
