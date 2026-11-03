from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from .models import PurchaseOrder, GoodsReceivedNote, PurchaseItem
from inventory.models import Stock
from products.models import ProductVariant

class GRNViewSet(viewsets.ModelViewSet):
    queryset = GoodsReceivedNote.objects.all()

    @action(detail=True, methods=['post'])
    def receive(self, request, pk=None):
        grn = self.get_object()
        try:
            with transaction.atomic():
                for item in grn.items.all():
                    stock, _ = Stock.objects.get_or_create(
                        branch=grn.branch,
                        variant=item.variant,
                        defaults={'quantity': 0}
                    )
                    stock.quantity += item.quantity
                    stock.save()
                return Response({'status': 'received'})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
