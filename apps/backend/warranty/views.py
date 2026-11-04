from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from .models import SerialNumber, WarrantyClaim
from .serializers import SerialNumberSerializer, WarrantyClaimSerializer
from django.utils import timezone
from datetime import timedelta

class SerialNumberViewSet(viewsets.ModelViewSet):
    queryset = SerialNumber.objects.all()
    serializer_class = SerialNumberSerializer

class WarrantyClaimViewSet(viewsets.ModelViewSet):
    queryset = WarrantyClaim.objects.all()
    serializer_class = WarrantyClaimSerializer

    @action(detail=False, methods=['post'])
    def check_warranty(self, request):
        serial = request.data.get('serial')
        try:
            sn = SerialNumber.objects.get(serial=serial)
            if sn.warranty_expires_at and sn.warranty_expires_at > timezone.now():
                return Response({'valid': True, 'expires_at': sn.warranty_expires_at})
            return Response({'valid': False})
        except SerialNumber.DoesNotExist:
            return Response({'valid': False}, status=404)
