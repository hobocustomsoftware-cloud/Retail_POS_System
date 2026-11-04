from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.http import FileResponse
import os
from .models import SystemBackup, ShopBackup
from .serializers import SystemBackupSerializer, ShopBackupSerializer
from .utils import create_system_backup, create_shop_backup


class SystemBackupViewSet(viewsets.ModelViewSet):
    queryset = SystemBackup.objects.all()
    serializer_class = SystemBackupSerializer
    
    @action(detail=False, methods=['post'])
    def create_backup(self, request):
        backup_type = request.data.get('backup_type', 'FULL')
        backup = SystemBackup.objects.create(
            filename='pending.zip',
            file_path='',
            backup_type=backup_type,
            status='RUNNING',
            created_by=request.user if request.user.is_authenticated else None
        )
        try:
            filename, file_path, file_size = create_system_backup(backup_type)
            backup.filename = filename
            backup.file_path = file_path
            backup.file_size = file_size
            backup.status = 'COMPLETED'
            backup.completed_at = timezone.now()
            backup.save()
            return Response(SystemBackupSerializer(backup).data)
        except Exception as e:
            backup.status = 'FAILED'
            backup.notes = str(e)
            backup.save()
            return Response({'error': str(e)}, status=500)
    
    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        backup = self.get_object()
        if backup.status != 'COMPLETED' or not os.path.exists(backup.file_path):
            return Response({'error': 'File not available'}, status=404)
        response = FileResponse(open(backup.file_path, 'rb'), as_attachment=True, filename=backup.filename)
        return response


class ShopBackupViewSet(viewsets.ModelViewSet):
    queryset = ShopBackup.objects.all()
    serializer_class = ShopBackupSerializer
    
    def get_queryset(self):
        shop = getattr(self.request, 'shop', None)
        if shop:
            return ShopBackup.objects.filter(shop=shop)
        return ShopBackup.objects.none()
    
    @action(detail=False, methods=['post'])
    def create_backup(self, request):
        shop = getattr(self.request, 'shop', None)
        if not shop:
            return Response({'error': 'No shop found'}, status=400)
        backup = ShopBackup.objects.create(
            shop=shop,
            filename='pending.zip',
            file_path='',
            status='RUNNING',
            created_by=request.user if request.user.is_authenticated else None,
            is_addon=True
        )
        try:
            filename, file_path, file_size = create_shop_backup(shop)
            backup.filename = filename
            backup.file_path = file_path
            backup.file_size = file_size
            backup.status = 'COMPLETED'
            backup.completed_at = timezone.now()
            backup.save()
            return Response(ShopBackupSerializer(backup).data)
        except Exception as e:
            backup.status = 'FAILED'
            backup.notes = str(e)
            backup.save()
            return Response({'error': str(e)}, status=500)
    
    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        backup = self.get_object()
        if backup.status != 'COMPLETED' or not os.path.exists(backup.file_path):
            return Response({'error': 'File not available'}, status=404)
        response = FileResponse(open(backup.file_path, 'rb'), as_attachment=True, filename=backup.filename)
        return response
