from django.contrib import admin
from .models import Attribute, AttributeValue, Product, ProductVariant

admin.site.register(Attribute)
admin.site.register(AttributeValue)
admin.site.register(Product)
admin.site.register(ProductVariant)
