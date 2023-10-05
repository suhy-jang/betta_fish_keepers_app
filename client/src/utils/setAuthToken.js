import axiosInstance from './axiosInstance'

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['authorization'] = `Bearer ${token}`
  } else {
    delete axiosInstance.defaults.headers.common['authorization']
  }
}

export { setAuthToken as default }
