from django.db import migrations, models
import django.db.models.deletion
from django.conf import settings

class Migration(migrations.Migration):
    initial = True
    dependencies = [('tenants', '0001_initial'), ('accounts', '__first__')]
    operations = [
        migrations.CreateModel(
            name='BillingInvoice',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoice_no', models.CharField(max_length=50, unique=True)),
                ('type', models.CharField(choices=[('SUBSCRIPTION', 'Subscription'), ('LICENSE', 'License'), ('ADDON', 'Addon')], max_length=20)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('currency', models.CharField(default='MMK', max_length=10)),
                ('status', models.CharField(choices=[('UNPAID', 'Unpaid'), ('PENDING', 'Pending Verification'), ('PAID', 'Paid'), ('REJECTED', 'Rejected'), ('CANCELLED', 'Cancelled')], default='UNPAID', max_length=20)),
                ('due_at', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='tenants.tenant')),
            ],
        ),
        migrations.CreateModel(
            name='ManualPaymentProof',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('method', models.CharField(choices=[('KPAY', 'KPay'), ('AYAPAY', 'AYA Pay'), ('CBPAY', 'CB Pay')], max_length=10)),
                ('sender_phone', models.CharField(blank=True, max_length=20)),
                ('sender_name', models.CharField(blank=True, max_length=100)),
                ('screenshot', models.ImageField(upload_to='billing/proofs/')),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('APPROVED', 'Approved'), ('REJECTED', 'Rejected')], default='PENDING', max_length=20)),
                ('admin_note', models.TextField(blank=True)),
                ('submitted_at', models.DateTimeField(auto_now_add=True)),
                ('reviewed_at', models.DateTimeField(blank=True, null=True)),
                ('invoice', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='proofs', to='billing.billinginvoice')),
                ('reviewed_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
