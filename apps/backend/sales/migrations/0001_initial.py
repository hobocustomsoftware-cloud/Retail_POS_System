from django.db import migrations, models
import django.db.models.deletion
from django.conf import settings

class Migration(migrations.Migration):
    initial = True
    dependencies = [('tenants', '0001_initial'), ('branches', '0001_initial'), ('customers', '0001_initial'), ('products', '0001_initial'), ('accounts', '__first__')]
    operations = [
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('invoice_no', models.CharField(max_length=100, unique=True)),
                ('status', models.CharField(choices=[('PENDING', 'Pending'), ('COMPLETED', 'Completed'), ('HOLD', 'Hold'), ('CANCELLED', 'Cancelled')], default='PENDING', max_length=20)),
                ('payment_status', models.CharField(choices=[('PAID', 'Paid'), ('PARTIAL', 'Partial'), ('UNPAID', 'Unpaid')], default='UNPAID', max_length=20)),
                ('subtotal', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('tax', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('paid_amount', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('change_amount', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='branches.branch')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='customers.customer')),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tenants.tenant')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='SaleItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('price', models.DecimalField(decimal_places=2, max_digits=12)),
                ('discount', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('total', models.DecimalField(decimal_places=2, max_digits=12)),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='sales.sale')),
                ('variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.productvariant')),
            ],
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('method', models.CharField(choices=[('CASH', 'Cash'), ('CARD', 'Card'), ('MOBILE', 'Mobile Money'), ('SPLIT', 'Split'), ('CREDIT', 'Credit')], max_length=20)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('reference', models.CharField(blank=True, max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('sale', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to='sales.sale')),
            ],
        ),
    ]
