# Generated migration

from django.db import migrations, models
import django.utils.timezone
from dateutil.relativedelta import relativedelta


def set_trial_37_days(apps, schema_editor):
    Shop = apps.get_model('tenants', 'Shop')
    for shop in Shop.objects.all():
        if not shop.trial_end:
            shop.trial_end = django.utils.timezone.now() + relativedelta(months=1) + __import__('datetime').timedelta(days=7)
            shop.save()


class Migration(migrations.Migration):

    dependencies = [
        ('tenants', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(set_trial_37_days, reverse_code=migrations.RunPython.noop),
    ]
