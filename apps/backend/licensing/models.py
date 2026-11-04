from django.db import models
from django.conf import settings
from django.utils import timezone


class LicenseActivation(models.Model):
    machine_id = models.CharField(max_length=64, unique=True)
    license_key = models.CharField(max_length=255)
    activated_at = models.DateTimeField(auto_now_add=True)
    is_valid = models.BooleanField(default=True)
    activated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
    )
    notes = models.TextField(blank=True)
    last_checked_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.machine_id[:12]}... - {self.license_key[:12]}..."
