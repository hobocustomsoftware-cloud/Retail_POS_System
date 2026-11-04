from django.db import models

class Tenant(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    plan = models.CharField(max_length=50, blank=True)
    subscription_status = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Shop(models.Model):
    owner = models.ForeignKey('accounts.User', on_delete=models.CASCADE)
    shop_name = models.CharField(max_length=255)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    logo = models.ImageField(upload_to='shops/', blank=True, null=True)
    trial_start = models.DateTimeField(auto_now_add=True)
    trial_end = models.DateTimeField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    subscription_status = models.CharField(max_length=20, default='TRIAL')  # TRIAL/ACTIVE/EXPIRED
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.shop_name

class DomainRequest(models.Model):
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE)
    requested_domain = models.CharField(max_length=255)
    type = models.CharField(max_length=20, default='CUSTOM_DOMAIN')  # CUSTOM_DOMAIN/SUBDOMAIN
    status = models.CharField(max_length=20, default='PENDING')  # PENDING/APPROVED/REJECTED
    requested_at = models.DateTimeField(auto_now_add=True)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
