import random
import string

def generate_barcode(prefix='PRD'):
    return f"{prefix}{''.join(random.choices(string.digits, k=12))}"

def generate_sku(prefix='SKU'):
    return f"{prefix}-{''.join(random.choices(string.ascii_uppercase + string.digits, k=8))}"
