from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):
    initial = True
    dependencies = [('tenants', '0001_initial'), ('branches', '0001_initial'), ('products', '0001_initial')]
    operations = [
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=0)),
                ('min_quantity', models.IntegerField(default=0)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='branches.branch')),
                ('tenant', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='tenants.tenant')),
                ('variant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.productvariant')),
            ],
            options={'unique_together': {('branch', 'variant')}},
        ),
    ]
