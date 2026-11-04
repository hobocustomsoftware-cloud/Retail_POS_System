from django.utils import timezone


def get_shop_status(shop):
    if not shop:
        return {'status': 'NO_SHOP', 'is_read_only': True, 'reason': 'NO_SHOP'}
    
    now = timezone.now()
    
    # If subscription is ACTIVE, check if it's still valid (if we have expiry)
    if shop.subscription_status == 'ACTIVE':
        return {'status': 'ACTIVE', 'is_read_only': False}
    
    # Check trial
    if shop.trial_end:
        if now <= shop.trial_end:
            return {'status': 'TRIAL', 'is_read_only': False, 'trial_end': shop.trial_end}
        else:
            return {'status': 'EXPIRED', 'is_read_only': True, 'reason': 'TRIAL_EXPIRED', 'trial_end': shop.trial_end}
    
    # No trial end set
    return {'status': 'EXPIRED', 'is_read_only': True, 'reason': 'NO_SUBSCRIPTION'}
