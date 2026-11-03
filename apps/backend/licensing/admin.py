from django.contrib import admin
from .models import License

@admin.register(License)
class LicenseAdmin(admin.ModelAdmin):
    list_display = ('key', 'status', 'machine_id', 'activated_at', 'expires_at')
