import { useEffect, useState } from 'react'
import api from '../api/axios'

export default function NotificationBell() {
  const [count, setCount] = useState(0)
  const [notifications, setNotifications] = useState<any[]>([])
  const [show, setShow] = useState(false)
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    fetchUnread()
    connectWS()
    return () => ws?.close()
  }, [])

  const fetchUnread = async () => {
    try {
      const res = await api.get('/api/notifications/unread_count/')
      setCount(res.data.count)
      const list = await api.get('/api/notifications/')
      setNotifications(list.data.results || list.data)
    } catch (e) {}
  }

  const connectWS = () => {
    try {
      const userId = localStorage.getItem('user_id') || '1'
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'
      const socket = new WebSocket(`${protocol}://localhost:8000/ws/notifications/${userId}/`)
      socket.onmessage = (e) => {
        const data = JSON.parse(e.data)
        if (data.type === 'notification') {
          setCount(c => c + 1)
          setNotifications(n => [data.notification, ...n])
          // Browser notification
          if (Notification.permission === 'granted') {
            new Notification(data.notification.title, { body: data.notification.message })
          }
        }
      }
      setWs(socket)
    } catch (e) {}
  }

  const markRead = async (id: number) => {
    try {
      await api.post(`/api/notifications/${id}/mark_read/`)
      setCount(c => Math.max(0, c - 1))
      setNotifications(n => n.map(x => x.id === id ? {...x, is_read: true} : x))
    } catch (e) {}
  }

  const requestPerm = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  useEffect(() => {
    requestPerm()
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setShow(!show)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.25rem', cursor: 'pointer' }}>
        🔔 {count > 0 && <span style={{ background: '#dc2626', borderRadius: '50%', padding: '0 0.4rem', fontSize: '0.75rem' }}>{count}</span>}
      </button>
      {show && (
        <div style={{ position: 'absolute', right: 0, top: '2rem', background: '#fff', color: '#000', width: '320px', maxHeight: '400px', overflow: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000 }}>
          <div style={{ padding: '0.75rem', borderBottom: '1px solid #e5e7eb', fontWeight: 'bold' }}>Notifications</div>
          {notifications.length === 0 && <div style={{ padding: '1rem', textAlign: 'center', color: '#6b7280' }}>No notifications</div>}
          {notifications.slice(0, 10).map(n => (
            <div key={n.id} onClick={() => markRead(n.id)} style={{ padding: '0.75rem', borderBottom: '1px solid #f3f4f6', cursor: 'pointer', background: n.is_read ? '#fff' : '#eff6ff' }}>
              <div style={{ fontWeight: n.is_read ? 'normal' : 'bold', fontSize: '0.875rem' }}>{n.title}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>{n.message}</div>
              <div style={{ fontSize: '0.7rem', color: '#9ca3af', marginTop: '0.25rem' }}>{new Date(n.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
