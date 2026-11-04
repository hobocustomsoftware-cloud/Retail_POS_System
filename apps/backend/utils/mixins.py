class TenantMixin:
    def get_queryset(self):
        qs = super().get_queryset()
        tenant_id = getattr(self.request, 'tenant_id', None)
        if tenant_id and hasattr(qs.model, 'tenant_id'):
            return qs.filter(tenant_id=tenant_id)
        return qs
