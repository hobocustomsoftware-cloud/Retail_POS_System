from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from django.utils import timezone
from datetime import datetime
from .models import Sale, SaleItem, Payment
from .serializers import SaleSerializer, SaleItemSerializer, PaymentSerializer
from inventory.models import Stock
from warranty.models import SerialNumber

class SaleViewSet(viewsets.ModelViewSet):
    queryset = Sale.objects.all().order_by('-created_at')
    serializer_class = SaleSerializer

    @action(detail=False, methods=['post'])
    def create_sale(self, request):
        data = request.data
        try:
            with transaction.atomic():
                branch_id = data.get('branch')
                invoice_no = f"INV-{datetime.now().strftime('%Y%m%d')}-{Sale.objects.filter(branch_id=branch_id).count()+1:05d}"
                sale = Sale.objects.create(
                    branch_id=branch_id,
                    invoice_no=invoice_no,
                    customer_id=data.get('customer'),
                    user=request.user if request.user.is_authenticated else None,
                    status='COMPLETED',
                    payment_status=data.get('payment_status', 'PAID'),
                    subtotal=data.get('subtotal', 0),
                    discount=data.get('discount', 0),
                    tax=data.get('tax', 0),
                    total=data.get('total', 0),
                    paid_amount=data.get('paid_amount', 0),
                    change_amount=data.get('change_amount', 0),
                )
                for item in data.get('items', []):
                    variant_id = item.get('variant')
                    qty = int(item.get('quantity', 1))
                    stock = Stock.objects.filter(branch_id=branch_id, variant_id=variant_id).first()
                    if stock and stock.quantity < qty:
                        return Response({'error': f'Insufficient stock for variant {variant_id}'}, status=400)
                    sale_item = SaleItem.objects.create(
                        sale=sale,
                        variant_id=variant_id,
                        quantity=qty,
                        price=item.get('price', 0),
                        discount=item.get('discount', 0),
                        total=item.get('total', 0),
                    )
                    if stock:
                        stock.quantity -= qty
                        stock.save()
                    for sn in item.get('serials', []):
                        SerialNumber.objects.filter(serial=sn, is_sold=False).update(is_sold=True, sold_at=timezone.now(), sale_item=sale_item)
                for pay in data.get('payments', []):
                    Payment.objects.create(
                        sale=sale,
                        method=pay.get('method'),
                        amount=pay.get('amount'),
                        reference=pay.get('reference', ''),
                    )
                return Response(SaleSerializer(sale).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def hold(self, request):
        data = request.data
        invoice_no = f"HOLD-{datetime.now().strftime('%H%M%S')}-{Sale.objects.count()+1:04d}"
        sale = Sale.objects.create(
            branch_id=data.get('branch'),
            invoice_no=invoice_no,
            customer_id=data.get('customer'),
            user=request.user if request.user.is_authenticated else None,
            status='HOLD',
            subtotal=data.get('subtotal', 0),
            discount=data.get('discount', 0),
            tax=data.get('tax', 0),
            total=data.get('total', 0),
        )
        for item in data.get('items', []):
            SaleItem.objects.create(
                sale=sale,
                variant_id=item.get('variant'),
                quantity=item.get('quantity', 1),
                price=item.get('price', 0),
                discount=item.get('discount', 0),
                total=item.get('total', 0),
            )
        return Response(SaleSerializer(sale).data)

    @action(detail=True, methods=['post'])
    def resume(self, request, pk=None):
        sale = self.get_object()
        if sale.status == 'HOLD':
            sale.status = 'PENDING'
            sale.save()
        return Response(SaleSerializer(sale).data)

    @action(detail=False, methods=['post'])
    def return_sale(self, request):
        invoice_no = request.data.get('invoice_no')
        try:
            sale = Sale.objects.get(invoice_no=invoice_no)
            return Response({'invoice_no': sale.invoice_no, 'items': SaleItemSerializer(sale.items.all(), many=True).data})
        except Sale.DoesNotExist:
            return Response({'error': 'Invoice not found'}, status=404)

class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    @action(detail=False, methods=['post'])
    def complete_return(self, request):
        invoice_no = request.data.get('invoice_no')
        items = request.data.get('items', [])
        try:
            with transaction.atomic():
                sale = Sale.objects.get(invoice_no=invoice_no)
                for it in items:
                    variant_id = it.get('variant')
                    qty = int(it.get('quantity', 0))
                    restock = it.get('restock', True)
                    if restock:
                        stock = Stock.objects.filter(branch=sale.branch, variant_id=variant_id).first()
                        if stock:
                            stock.quantity += qty
                            stock.save()
                return Response({'status': 'returned'})
        except Exception as e:
            return Response({'error': str(e)}, status=400)
