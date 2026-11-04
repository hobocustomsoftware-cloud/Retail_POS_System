from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/licensing/', include('licensing.urls')),
    path('api/products/', include('products.urls')),
    path('api/sales/', include('sales.urls')),
    path('api/purchases/', include('purchases.urls')),
    path('api/warranty/', include('warranty.urls')),
    path('api/inventory/', include('inventory.urls')),
    path('api/customers/', include('customers.urls')),
    path('api/suppliers/', include('suppliers.urls')),
    path('api/branches/', include('branches.urls')),
    path('api/accounts/', include('accounts.urls')),
    path('api/billing/', include('billing.urls')),
    path('api/tenants/', include('tenants.urls')),
    path('api/notifications/', include('notifications.urls')),
]
