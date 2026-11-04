from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SupplierViewSet, CategoryViewSet, BrandViewSet, UnitViewSet

router = DefaultRouter()
router.register(r'suppliers', SupplierViewSet, basename='supplier')
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'brands', BrandViewSet, basename='brand')
router.register(r'units', UnitViewSet, basename='unit')

urlpatterns = [
    path('', include(router.urls)),
]
