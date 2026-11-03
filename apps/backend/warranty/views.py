from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import SerialNumber, WarrantyClaim
from .serializers import SerialNumberSerializer, WarrantyClaimSerializer

class SerialNumberSerializer:
    pass

class WarrantyClaimSerializer:
    pass

class SerialNumberViewSet(viewsets.ModelViewSet):
    queryset = SerialNumber.objects.all()
    serializer_class = None

class WarrantyClaimViewSet(viewsets.ModelViewSet):
    queryset = WarrantyClaim.objects.all()
    serializer_class = None
