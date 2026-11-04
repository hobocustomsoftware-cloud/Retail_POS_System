from rest_framework.routers import DefaultRouter
from .views import NotificationViewSet, PushDeviceViewSet

router = DefaultRouter()
router.register(r'', NotificationViewSet)
router.register(r'devices', PushDeviceViewSet)

urlpatterns = router.urls
