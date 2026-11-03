from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('POS Info', {'fields': ('tenant', 'branch', 'role', 'pin', 'phone')}),
    )
    list_display = ('username', 'email', 'role', 'branch', 'is_active')
