import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URI,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    localStorage.setItem('token', null)
    return Promise.reject(error)
  },
)

export default axiosInstance
