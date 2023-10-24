import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
const router = useRouter();
const baseURL = 'http://tarixmanba.sosgroup.uz/api/'

const api = axios.create({
    baseURL,
    headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
})

api.interceptors.response.use(config => config, error => {
    if(error?.response?.status === 401) {
        router.push('/login')
        localStorage.removeItem('token')
    }

    return Promise.reject(error)
})

export default api