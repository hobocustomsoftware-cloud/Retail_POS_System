from django.contrib import admin
from .models import LicenseActivation


@admin.register(LicenseActivation)
class LicenseActivationAdmin(admin.ModelAdmin):
    list_display = ('machine_id', 'license_key', 'is_valid', 'activated_at', 'last_checked_at')
    search_fields = ('machine_id', 'license_key')
    readonly_fields = ('activated_at', 'last_checked_at')
