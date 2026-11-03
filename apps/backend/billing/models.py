from django.db import models
from django.conf import settings

class BillingInvoice(models.Model):
    TYPE_CHOICES = (('SUBSCRIPTION', 'Subscription'), ('LICENSE', 'License'), ('ADDON', 'Addon'))
    STATUS_CHOICES = (('UNPAID', 'Unpaid'), ('PENDING', 'Pending Verification'), ('PAID', 'Paid'), ('REJECTED', 'Rejected'), ('CANCELLED', 'Cancelled'))
    
    invoice_no = models.CharField(max_length=50, unique=True)
    tenant = models.ForeignKey('tenants.Tenant', null=True, blank=True, on_delete=models.SET_NULL)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    currency = models.CharField(max_length=10, default='MMK')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='UNPAID')
    due_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.invoice_no

class ManualPaymentProof(models.Model):
    METHOD_CHOICES = (('KPAY', 'KPay'), ('AYAPAY', 'AYA Pay'), ('CBPAY', 'CB Pay'))
    STATUS_CHOICES = (('PENDING', 'Pending'), ('APPROVED', 'Approved'), ('REJECTED', 'Rejected'))
    
    invoice = models.ForeignKey(BillingInvoice, on_delete=models.CASCADE, related_name='proofs')
    method = models.CharField(max_length=10, choices=METHOD_CHOICES)
    sender_phone = models.CharField(max_length=20, blank=True)
    sender_name = models.CharField(max_length=100, blank=True)
    screenshot = models.ImageField(upload_to='billing/proofs/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.SET_NULL)
    reviewed_at = models.DateTimeField(null=True, blank=True)
    admin_note = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
