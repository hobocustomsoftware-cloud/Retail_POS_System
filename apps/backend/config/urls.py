from django.urls import path, include
from rest_framework.routers import DefaultRouter
from sales.views import SaleViewSet, PaymentViewSet

router = DefaultRouter()
router.register(r'sales', SaleViewSet)
router.register(r'payments', PaymentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
