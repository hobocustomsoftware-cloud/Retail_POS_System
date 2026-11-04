from django.db import models
from django.conf import settings


class Notification(models.Model):
    TYPE_CHOICES = (
        ('SYSTEM', 'System'),
        ('SALE', 'Sale'),
        ('INVENTORY', 'Inventory'),
        ('BILLING', 'Billing'),
        ('PURCHASE', 'Purchase'),
        ('LICENSE', 'License'),
    )
    
    PRIORITY_CHOICES = (
        ('LOW', 'Low'),
        ('MEDIUM', 'Medium'),
        ('HIGH', 'High'),
        ('URGENT', 'Urgent'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='notifications')
    shop = models.ForeignKey('tenants.Shop', on_delete=models.CASCADE, null=True, blank=True, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='SYSTEM')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='MEDIUM')
    data = models.JSONField(default=dict, blank=True)
    is_read = models.BooleanField(default=False)
    is_pushed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.user or self.shop}"


class PushDevice(models.Model):
    PLATFORM_CHOICES = (
        ('WEB', 'Web'),
        ('ANDROID', 'Android'),
        ('IOS', 'iOS'),
        ('DESKTOP', 'Desktop'),
    )
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    shop = models.ForeignKey('tenants.Shop', on_delete=models.CASCADE, null=True, blank=True)
    token = models.TextField(unique=True)
    platform = models.CharField(max_length=10, choices=PLATFORM_CHOICES, default='WEB')
    device_info = models.JSONField(default=dict, blank=True)
    is_active = models.BooleanField(default=True)
    last_used_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.platform} - {self.token[:20]}..."
