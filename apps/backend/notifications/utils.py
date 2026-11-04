from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import Notification


def send_notification(user=None, shop=None, title='', message='', type='SYSTEM', priority='MEDIUM', data=None):
    if data is None:
        data = {}
    
    notification = Notification.objects.create(
        user=user,
        shop=shop,
        title=title,
        message=message,
        type=type,
        priority=priority,
        data=data
    )
    
    channel_layer = get_channel_layer()
    if channel_layer:
        group_name = f'notifications_{user.id}' if user else (f'notifications_shop_{shop.id}' if shop else 'notifications_all')
        async_to_sync(channel_layer.group_send)(
            group_name,
            {
                'type': 'send_notification',
                'notification': {
                    'id': notification.id,
                    'title': notification.title,
                    'message': notification.message,
                    'type': notification.type,
                    'priority': notification.priority,
                    'data': notification.data,
                    'created_at': notification.created_at.isoformat(),
                    'is_read': notification.is_read
                }
            }
        )
    
    notification.is_pushed = True
    notification.save()
    return notification


def send_system_notification(title, message, priority='MEDIUM'):
    return send_notification(user=None, shop=None, title=title, message=message, type='SYSTEM', priority=priority)


def notify_low_stock(product_name, branch_name, quantity):
    return send_notification(
        user=None, shop=None,
        title='Low Stock Alert',
        message=f'{product_name} is running low at {branch_name}. Only {quantity} left.',
        type='INVENTORY',
        priority='HIGH',
        data={'product': product_name, 'branch': branch_name, 'quantity': quantity}
    )


def notify_sale(invoice_no, amount):
    return send_notification(
        user=None, shop=None,
        title='New Sale',
        message=f'Sale {invoice_no} completed - {amount} MMK',
        type='SALE',
        priority='MEDIUM',
        data={'invoice_no': invoice_no, 'amount': amount}
    )
