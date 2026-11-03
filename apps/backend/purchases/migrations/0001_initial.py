from django.db import migrations, models
import django.db.models.deletion
from django.conf import settings

class Migration(migrations.Migration):
    initial = True
    dependencies = [('tenants', '0001_initial'), ('branches', '0001_initial'), ('suppliers', '0001_initial'), ('products', '0001_initial'), ('accounts', '__first__')]
    operations = [
        migrations.CreateModel(
            name='PurchaseOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('po_no', models.CharField(max_length=100, unique=True)),
                ('status', models.CharField(default='PENDING', max_length=20)),
                ('total', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='branches.branch')),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='suppliers.supplier')),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tenants.tenant')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='GoodsReceivedNote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('grn_no', models.CharField(max_length=100, unique=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='branches.branch')),
                ('po', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='purchases.purchaseorder')),
                ('supplier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='suppliers.supplier')),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tenants.tenant')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='PurchaseItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('cost_price', models.DecimalField(decimal_places=2, max_digits=12)),
                ('total', models.DecimalField(decimal_places=2, max_digits=12)),
                ('grn', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='purchases.goodsreceivednote')),
                ('variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.productvariant')),
            ],
        ),
    ]
