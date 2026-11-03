from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, ProductVariantViewSet, AttributeViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'variants', ProductVariantViewSet)
router.register(r'attributes', AttributeViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
