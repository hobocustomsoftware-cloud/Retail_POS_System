import { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'

export default function SubscriptionBanner() {
  const [status, setStatus] = useState<any>(null)
  const navigate = useNavigate()

  useEffect(() => {
    api.get('/api/tenants/shops/status/').then(r => setStatus(r.data)).catch(() => {})
  }, [])

  if (!status) return null
  if (status.status === 'ACTIVE') return null
  if (status.status === 'TRIAL' && status.trial_end) {
    const end = new Date(status.trial_end)
    const now = new Date()
    const days = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)))
    if (days > 0) {
      return (
        <div style={{ background: '#f59e0b', color: '#000', padding: '0.5rem 1rem', textAlign: 'center', fontSize: '0.875rem' }}>
          Trial Period - {days} day(s) remaining. <button onClick={() => navigate('/billing/pricing')} style={{ marginLeft: '0.5rem', padding: '0.25rem 0.75rem' }}>Subscribe Now</button>
        </div>
      )
    }
  }
  if (status.is_read_only || status.status === 'EXPIRED') {
    return (
      <div style={{ background: '#dc2626', color: '#fff', padding: '0.5rem 1rem', textAlign: 'center', fontSize: '0.875rem' }}>
        View Only Mode - Trial expired. Please subscribe to continue transactions. <button onClick={() => navigate('/billing/pricing')} style={{ marginLeft: '0.5rem', padding: '0.25rem 0.75rem', background: '#fff', color: '#dc2626', border: 'none' }}>Subscribe Now</button>
      </div>
    )
  }
  return null
}
