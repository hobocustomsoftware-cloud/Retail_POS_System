from django.contrib import admin
from .models import SystemBackup, ShopBackup


@admin.register(SystemBackup)
class SystemBackupAdmin(admin.ModelAdmin):
    list_display = ('filename', 'backup_type', 'status', 'file_size', 'created_by', 'created_at')
    list_filter = ('status', 'backup_type')
    readonly_fields = ('filename', 'file_path', 'file_size', 'completed_at')


@admin.register(ShopBackup)
class ShopBackupAdmin(admin.ModelAdmin):
    list_display = ('shop', 'filename', 'status', 'is_addon', 'file_size', 'created_at')
    list_filter = ('status', 'is_addon')
    readonly_fields = ('filename', 'file_path', 'file_size', 'completed_at')
