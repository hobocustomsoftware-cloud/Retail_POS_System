# Generated manually
from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    initial = True
    dependencies = []
    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('code', models.CharField(blank=True, max_length=100)),
                ('description', models.TextField(blank=True)),
                ('has_variants', models.BooleanField(default=False)),
                ('track_serial', models.BooleanField(default=False)),
                ('warranty_months', models.IntegerField(default=0)),
                ('warranty_years', models.IntegerField(default=0)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductVariant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sku', models.CharField(max_length=100, unique=True)),
                ('barcode', models.CharField(blank=True, max_length=100, unique=True)),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('cost_price', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('wholesale_price', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('is_active', models.BooleanField(default=True)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variants', to='products.product')),
            ],
        ),
    ]
