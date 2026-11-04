import os
import json
import zipfile
from datetime import datetime
from django.conf import settings


def create_system_backup(backup_type='FULL'):
    backup_dir = os.path.join(settings.BASE_DIR, 'backups_storage')
    os.makedirs(backup_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'system_backup_{backup_type}_{timestamp}.zip'
    file_path = os.path.join(backup_dir, filename)
    
    # Create backup zip
    with zipfile.ZipFile(file_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Backup database
        if backup_type in ['FULL', 'DB_ONLY']:
            db_path = settings.DATABASES['default'].get('NAME')
            if db_path and os.path.exists(db_path):
                zipf.write(db_path, f'database/{os.path.basename(db_path)}')
        # Backup media files
        if backup_type in ['FULL', 'FILES_ONLY']:
            media_root = getattr(settings, 'MEDIA_ROOT', None)
            if media_root and os.path.exists(media_root):
                for root, dirs, files in os.walk(media_root):
                    for file in files:
                        full_path = os.path.join(root, file)
                        arcname = os.path.relpath(full_path, media_root)
                        zipf.write(full_path, f'media/{arcname}')
        # Backup info
        info = {
            'backup_type': backup_type,
            'created_at': timestamp,
            'deployment_mode': getattr(settings, 'DEPLOYMENT_MODE', 'STANDALONE')
        }
        zipf.writestr('backup_info.json', json.dumps(info, indent=2))
    
    file_size = os.path.getsize(file_path)
    return filename, file_path, file_size


def create_shop_backup(shop):
    backup_dir = os.path.join(settings.BASE_DIR, 'backups_storage', f'shop_{shop.id}')
    os.makedirs(backup_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f'{shop.slug or shop.id}_backup_{timestamp}.zip'
    file_path = os.path.join(backup_dir, filename)
    
    with zipfile.ZipFile(file_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Backup shop-related data
        info = {
            'shop_id': shop.id,
            'shop_name': shop.shop_name,
            'backup_type': 'SHOP_BACKUP',
            'created_at': timestamp
        }
        zipf.writestr('shop_info.json', json.dumps(info, indent=2))
        # Add shop logo if exists
        if shop.logo:
            try:
                logo_path = shop.logo.path
                if os.path.exists(logo_path):
                    zipf.write(logo_path, f'media/logo_{os.path.basename(logo_path)}')
            except:
                pass
    
    file_size = os.path.getsize(file_path)
    return filename, file_path, file_size
