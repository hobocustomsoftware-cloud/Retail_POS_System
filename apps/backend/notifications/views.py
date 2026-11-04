from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import Notification, PushDevice
from .serializers import NotificationSerializer, PushDeviceSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    
    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Notification.objects.filter(user=user)
        return Notification.objects.none()
    
    @action(detail=True, methods=['post'])
    def mark_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.read_at = timezone.now()
        notification.save()
        return Response({'status': 'read'})
    
    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        user = request.user
        if user.is_authenticated:
            Notification.objects.filter(user=user, is_read=False).update(is_read=True, read_at=timezone.now())
        return Response({'status': 'all_read'})
    
    @action(detail=False, methods=['get'])
    def unread_count(self, request):
        user = request.user
        if user.is_authenticated:
            count = Notification.objects.filter(user=user, is_read=False).count()
            return Response({'count': count})
        return Response({'count': 0})


class PushDeviceViewSet(viewsets.ModelViewSet):
    queryset = PushDevice.objects.all()
    serializer_class = PushDeviceSerializer
    
    @action(detail=False, methods=['post'])
    def register(self, request):
        token = request.data.get('token')
        platform = request.data.get('platform', 'WEB')
        if not token:
            return Response({'error': 'token required'}, status=400)
        device, created = PushDevice.objects.update_or_create(
            token=token,
            defaults={
                'user': request.user if request.user.is_authenticated else None,
                'platform': platform,
                'device_info': request.data.get('device_info', {}),
                'is_active': True
            }
        )
        return Response(PushDeviceSerializer(device).data)
