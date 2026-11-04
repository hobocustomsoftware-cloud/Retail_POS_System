from rest_framework.routers import DefaultRouter
from .views import SystemBackupViewSet, ShopBackupViewSet

router = DefaultRouter()
router.register(r'system', SystemBackupViewSet)
router.register(r'shop', ShopBackupViewSet)

urlpatterns = router.urls
