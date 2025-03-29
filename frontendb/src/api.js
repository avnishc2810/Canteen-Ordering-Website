import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const BASE_URL = "http://localhost:8001"

const api = axios.create({
    baseURL: "http://127.0.0.1:8001"
})


api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const currrent_time = Date.now() / 1000

            if(expiry_date > currrent_time){
                config.headers.Authorization = `Bearer ${token}`
            }
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)

    }
)


export default api