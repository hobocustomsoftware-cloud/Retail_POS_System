import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

api.interceptors.request.use((config) => {
  const mid = localStorage.getItem('machine_id')
  if (mid) {
    config.headers = config.headers || {}
    config.headers['X-Machine-ID'] = mid
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const data = error.response?.data
    if (status === 403 && data?.code === 'VIEW_ONLY') {
      alert(data.detail || 'View only mode. Trial expired. Please subscribe to continue.')
      window.location.hash = '#/billing/pricing'
    } else if (status === 423 && (data?.code === 'LICENSE_REQUIRED' || data?.code === 'LICENSE_INVALID')) {
      alert(data.detail || 'License required. Please activate your license.')
      window.location.hash = '#/license/activate'
    }
    return Promise.reject(error)
  }
)

export default api
