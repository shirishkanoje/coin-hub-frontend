import axios from "axios"

export const API_BASE_URL = "https://coin-hub-backend-production.up.railway.app"


const api=axios.create({
    baseURL: API_BASE_URL,
    headers:{
        "Content-Type":"application/json"
    }
})




export default api;
