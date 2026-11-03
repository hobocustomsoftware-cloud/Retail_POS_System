from rest_framework import serializers
from .models import BillingInvoice, ManualPaymentProof

class BillingInvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingInvoice
        fields = '__all__'

class ManualPaymentProofSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManualPaymentProof
        fields = '__all__'
