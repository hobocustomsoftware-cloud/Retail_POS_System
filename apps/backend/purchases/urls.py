from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GRNViewSet

router = DefaultRouter()
router.register(r'grn', GRNViewSet, basename='grn')

urlpatterns = [
    path('', include(router.urls)),
]
