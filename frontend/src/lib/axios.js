import axios from 'axios'

export const axioxInstance = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'https://localhost:3000/api' : '/api',
    withCredentials :true 
})