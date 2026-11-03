from django.contrib import admin
from .models import BillingInvoice, ManualPaymentProof

admin.site.register(BillingInvoice)
admin.site.register(ManualPaymentProof)
