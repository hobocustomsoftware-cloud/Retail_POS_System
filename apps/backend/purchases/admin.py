from django.contrib import admin
from .models import PurchaseOrder, GoodsReceivedNote, PurchaseItem

admin.site.register(PurchaseOrder)
admin.site.register(GoodsReceivedNote)
admin.site.register(PurchaseItem)
