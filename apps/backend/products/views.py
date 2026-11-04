from rest_framework import viewsets
from .models import Product, ProductVariant, Attribute
from .serializers import ProductSerializer, ProductVariantSerializer, AttributeSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class ProductVariantViewSet(viewsets.ModelViewSet):
    queryset = ProductVariant.objects.all()
    serializer_class = ProductVariantSerializer

class AttributeViewSet(viewsets.ModelViewSet):
    queryset = Attribute.objects.all()
    serializer_class = AttributeSerializer

from rest_framework.decorators import action
from rest_framework.response import Response

class ProductViewSet(ProductViewSet):
    @action(detail=False, methods=['post'])
    def generate_variants(self, request):
        data = request.data
        product_id = data.get('product')
        attribute_value_ids = data.get('attribute_values', [])
        variants_created = []
        for av_id in attribute_value_ids:
            variant = ProductVariant.objects.create(
                product_id=product_id,
                sku=generate_sku(),
                barcode=generate_barcode(),
                price=data.get('price', 0),
            )
            variant.attribute_values.add(av_id)
            variants_created.append(ProductVariantSerializer(variant).data)
        return Response({'variants': variants_created})

from products.serializers import ProductVariantSerializer
from products.models import ProductVariant
from utils.barcode import generate_sku, generate_barcode
