from django.db import models
from django.conf import settings

class Attribute(models.Model):
    tenant = models.ForeignKey('tenants.Tenant', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)  # Color, Size, Gender
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class AttributeValue(models.Model):
    attribute = models.ForeignKey(Attribute, on_delete=models.CASCADE, related_name='values')
    value = models.CharField(max_length=100)  # Red, S, M, L, Men, Women, Kids

    def __str__(self):
        return f"{self.attribute.name}: {self.value}"

class Product(models.Model):
    tenant = models.ForeignKey('tenants.Tenant', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=100, blank=True)
    category = models.ForeignKey('suppliers.Category', on_delete=models.SET_NULL, null=True)
    brand = models.ForeignKey('suppliers.Brand', on_delete=models.SET_NULL, null=True, blank=True)
    unit = models.ForeignKey('suppliers.Unit', on_delete=models.SET_NULL, null=True)
    description = models.TextField(blank=True)
    has_variants = models.BooleanField(default=False)
    track_serial = models.BooleanField(default=False)
    warranty_months = models.IntegerField(default=0)
    warranty_years = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class ProductVariant(models.Model):
    tenant = models.ForeignKey('tenants.Tenant', on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    sku = models.CharField(max_length=100, unique=True)
    barcode = models.CharField(max_length=100, unique=True, blank=True)
    attribute_values = models.ManyToManyField(AttributeValue)
    price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    cost_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    wholesale_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.sku
