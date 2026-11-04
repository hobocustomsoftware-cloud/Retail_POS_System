from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import ManualPaymentProof, BillingInvoice
from tenants.models import Shop


@receiver(post_save, sender=ManualPaymentProof)
def activate_subscription_on_approval(sender, instance, **kwargs):
    if instance.status == 'APPROVED':
        invoice = instance.invoice
        if invoice.shop:
            shop = invoice.shop
            shop.subscription_status = 'ACTIVE'
            shop.is_active = True
            shop.save()
        elif invoice.tenant_id:
            # Try to find shop by tenant
            pass
