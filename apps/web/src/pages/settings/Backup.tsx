import { useState, useEffect } from 'react'
import api from '../../api/axios'

export default function Backup() {
  const [systemBackups, setSystemBackups] = useState<any[]>([])
  const [shopBackups, setShopBackups] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadBackups()
  }, [])

  const loadBackups = async () => {
    try {
      const [sys, shop] = await Promise.all([
        api.get('/api/backups/system/'),
        api.get('/api/backups/shop/')
      ])
      setSystemBackups(sys.data.results || sys.data)
      setShopBackups(shop.data.results || shop.data)
    } catch (e) {}
  }

  const createSystemBackup = async (type: string) => {
    setLoading(true)
    try {
      await api.post('/api/backups/system/create_backup/', { backup_type: type })
      alert('System backup created')
      loadBackups()
    } catch (e: any) {
      alert(e.response?.data?.error || 'Failed')
    }
    setLoading(false)
  }

  const createShopBackup = async () => {
    setLoading(true)
    try {
      await api.post('/api/backups/shop/create_backup/', {})
      alert('Shop backup created (Add-on)')
      loadBackups()
    } catch (e: any) {
      alert(e.response?.data?.error || 'Failed')
    }
    setLoading(false)
  }

  const download = async (url: string, filename: string) => {
    const res = await api.get(url, { responseType: 'blob' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([res.data]))
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Backup Management</h1>
      
      <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>System Backup (Platform Admin)</h2>
        <p style={{ color: '#6b7280' }}>Create full system backup of database and files</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button onClick={() => createSystemBackup('FULL')} disabled={loading} style={{ padding: '0.5rem 1rem' }}>Full Backup</button>
          <button onClick={() => createSystemBackup('DB_ONLY')} disabled={loading} style={{ padding: '0.5rem 1rem' }}>Database Only</button>
          <button onClick={() => createSystemBackup('FILES_ONLY')} disabled={loading} style={{ padding: '0.5rem 1rem' }}>Files Only</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Filename</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Type</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Size</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Created</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {systemBackups.map(b => (
              <tr key={b.id}>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{b.filename}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{b.backup_type}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{b.status}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{b.file_size} bytes</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{new Date(b.created_at).toLocaleString()}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>
                  {b.status === 'COMPLETED' && <button onClick={() => download(`/api/backups/system/${b.id}/download/`, b.filename)}>Download</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ background: '#fff', padding: '1.5rem', border: '1px solid #e5e7eb', marginTop: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>Shop Backup (Add-on)</h2>
        <p style={{ color: '#6b7280' }}>Create backup for your shop data - Available as add-on service</p>
        <button onClick={createShopBackup} disabled={loading} style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}>Create Shop Backup</button>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Filename</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Status</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Add-on</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Size</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Created</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', border: '1px solid #e5e7eb' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {shopBackups.map(b => (
              <tr key={b.id}>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{b.filename}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{b.status}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{b.is_addon ? 'Yes' : 'No'}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{b.file_size} bytes</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>{new Date(b.created_at).toLocaleString()}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #e5e7eb' }}>
                  {b.status === 'COMPLETED' && <button onClick={() => download(`/api/backups/shop/${b.id}/download/`, b.filename)}>Download</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
