import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const navigate = useNavigate()
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Settings</h1>
      <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', marginTop: '1rem', maxWidth: 600 }}>
        <h2 style={{ marginTop: 0 }}>License</h2>
        <p style={{ color: '#6b7280' }}>For standalone (EXE) installations</p>
        <button onClick={() => navigate('/license/activate')} style={{ background: '#aa0000', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer' }}>
          License Activation
        </button>
      </div>
      <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', marginTop: '1rem', maxWidth: 600 }}>
        <h2 style={{ marginTop: 0 }}>Billing & Subscription</h2>
        <p style={{ color: '#6b7280' }}>Manage your subscription plan</p>
        <button onClick={() => navigate('/billing/pricing')} style={{ background: '#2563eb', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer', marginRight: '0.5rem' }}>
          View Plans
        </button>
        <button onClick={() => navigate('/billing/history')} style={{ background: '#6b7280', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer' }}>
          Billing History
        </button>
      </div>
    </div>
  )
}
