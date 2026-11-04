from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .models import BillingInvoice, ManualPaymentProof, SubscriptionPlan
from .serializers import BillingInvoiceSerializer, ManualPaymentProofSerializer, SubscriptionPlanSerializer
import datetime


class BillingInvoiceViewSet(viewsets.ModelViewSet):
    queryset = BillingInvoice.objects.all().order_by('-created_at')
    serializer_class = BillingInvoiceSerializer

    @action(detail=False, methods=['post'])
    def create_invoice(self, request):
        inv_no = f"BILL-{datetime.datetime.now().strftime('%Y%m%d')}-{BillingInvoice.objects.count()+1:06d}"
        inv = BillingInvoice.objects.create(
            invoice_no=inv_no,
            type=request.data.get('type','SUBSCRIPTION'),
            amount=request.data.get('amount',0)
        )
        return Response(BillingInvoiceSerializer(inv).data)


class ManualPaymentProofViewSet(viewsets.ModelViewSet):
    queryset = ManualPaymentProof.objects.all().order_by('-submitted_at')
    serializer_class = ManualPaymentProofSerializer

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        proof = self.get_object()
        proof.status = 'APPROVED'
        proof.reviewed_at = timezone.now()
        proof.reviewed_by = request.user
        proof.save()
        invoice = proof.invoice
        if invoice.shop:
            invoice.shop.subscription_status = 'ACTIVE'
            invoice.shop.is_active = True
            invoice.shop.save()
        invoice.status = 'PAID'
        invoice.save()
        return Response({'status': 'approved'})

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        proof = self.get_object()
        proof.status = 'REJECTED'
        proof.reviewed_at = timezone.now()
        proof.reviewed_by = request.user
        proof.admin_note = request.data.get('note', '')
        proof.save()
        invoice = proof.invoice
        invoice.status = 'REJECTED'
        invoice.save()
        return Response({'status': 'rejected'})


class SubscriptionPlanViewSet(viewsets.ModelViewSet):
    queryset = SubscriptionPlan.objects.all()
    serializer_class = SubscriptionPlanSerializer
