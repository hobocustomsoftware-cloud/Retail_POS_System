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

export default api
