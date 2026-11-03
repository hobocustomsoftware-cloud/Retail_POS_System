from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    initial = True
    dependencies = [('tenants', '0001_initial'), ('suppliers', '0001_initial')]
    operations = [
        migrations.CreateModel(
            name='Attribute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=True)),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tenants.tenant')),
            ],
        ),
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
                ('brand', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='suppliers.brand')),
                ('category', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='suppliers.category')),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tenants.tenant')),
                ('unit', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='suppliers.unit')),
            ],
        ),
        migrations.CreateModel(
            name='AttributeValue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=100)),
                ('attribute', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='values', to='products.attribute')),
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
                ('attribute_values', models.ManyToManyField(to='products.attributevalue')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variants', to='products.product')),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tenants.tenant')),
            ],
        ),
    ]
