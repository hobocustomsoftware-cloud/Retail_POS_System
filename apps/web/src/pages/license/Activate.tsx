import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function LicenseActivate() {
  const [machineId, setMachineId] = useState('')
  const [licenseKey, setLicenseKey] = useState('')
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const getMachineId = () => {
    const data = [navigator.userAgent, navigator.language, screen.width, screen.height].join('|')
    let hash = 0
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data.charCodeAt(i)
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(16, '0')
  }

  useEffect(() => {
    const mid = localStorage.getItem('machine_id') || getMachineId()
    localStorage.setItem('machine_id', mid)
    setMachineId(mid)
    checkStatus(mid)
  }, [])

  const checkStatus = async (mid: string) => {
    try {
      const res = await api.get('/api/licensing/status/', { headers: { 'X-Machine-ID': mid } })
      setStatus(res.data)
    } catch (e: any) {
      setStatus(e.response?.data || { valid: false })
    }
  }

  const activate = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/api/licensing/activate/', { key: licenseKey, machine_id: machineId }, { headers: { 'X-Machine-ID': machineId } })
      alert(res.data.message)
      checkStatus(machineId)
    } catch (e: any) {
      alert(e.response?.data?.message || 'Activation failed')
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>License Activation (Standalone)</h1>
      <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <h3>Machine ID</h3>
        <code style={{ display: 'block', background: '#f3f4f6', padding: '0.75rem', wordBreak: 'break-all' }}>{machineId}</code>
        <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Send this Machine ID to get your license key</p>
      </div>
      <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <h3>Status</h3>
        <p>Valid: <strong style={{ color: status?.valid ? '#059669' : '#dc2626' }}>{status?.valid ? 'Yes' : 'No'}</strong></p>
        <p>Mode: {status?.mode}</p>
        {status?.reason && <p style={{ color: '#dc2626' }}>Reason: {status?.reason}</p>}
      </div>
      {!status?.valid && (
        <form onSubmit={activate} style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
          <h3>Activate License</h3>
          <input
            required
            placeholder="Enter License Key (e.g., POS-XXXX-XXXX-XXXX)"
            value={licenseKey}
            onChange={e => setLicenseKey(e.target.value)}
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', border: '1px solid #d1d5db' }}
          />
          <button type="submit" disabled={loading} style={{ background: '#aa0000', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', cursor: 'pointer' }}>
            {loading ? 'Activating...' : 'Activate License'}
          </button>
        </form>
      )}
    </div>
  )
}
