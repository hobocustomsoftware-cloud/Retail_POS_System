from django.core.management.base import BaseCommand
from branches.models import Branch
from suppliers.models import Category, Brand, Unit
from products.models import Attribute, AttributeValue
from accounts.models import User

class Command(BaseCommand):
    help = 'Seed basic data'

    def handle(self, *args, **options):
        branch, _ = Branch.objects.get_or_create(name='Main Store')
        cat, _ = Category.objects.get_or_create(name='General')
        brand, _ = Brand.objects.get_or_create(name='Generic')
        unit, _ = Unit.objects.get_or_create(name='Piece', defaults={'short_name': 'pcs'})
        color, _ = Attribute.objects.get_or_create(name='Color')
        size, _ = Attribute.objects.get_or_create(name='Size')
        for v in ['Red', 'Blue', 'Black', 'White']:
            AttributeValue.objects.get_or_create(attribute=color, value=v)
        for v in ['S', 'M', 'L', 'XL', 'XXL', 'XXXL']:
            AttributeValue.objects.get_or_create(attribute=size, value=v)
        User.objects.get_or_create(username='admin', defaults={'role': 'ADMIN', 'pin': '1234', 'is_staff': True, 'is_superuser': True})
        self.stdout.write(self.style.SUCCESS('Seeded'))
