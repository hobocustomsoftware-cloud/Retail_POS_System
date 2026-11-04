from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SerialNumberViewSet, WarrantyClaimViewSet

router = DefaultRouter()
router.register(r'serials', SerialNumberViewSet, basename='serial')
router.register(r'claims', WarrantyClaimViewSet, basename='warranty-claim')

urlpatterns = [
    path('', include(router.urls)),
]
