from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BillingInvoiceViewSet, ManualPaymentProofViewSet

router = DefaultRouter()
router.register(r'invoices', BillingInvoiceViewSet)
router.register(r'proofs', ManualPaymentProofViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
router.register(r'plans', SubscriptionPlanViewSet)
