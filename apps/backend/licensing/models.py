from django.db import models

class License(models.Model):
    STATUS_CHOICES = (
        ('VALID', 'Valid'),
        ('INVALID', 'Invalid'),
        ('EXPIRED', 'Expired'),
    )
    key = models.CharField(max_length=255, unique=True)
    machine_id = models.CharField(max_length=255, blank=True)
    activated_at = models.DateTimeField(null=True, blank=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='INVALID')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.key
