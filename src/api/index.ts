import axios from "axios"

const BASE_URL = 'https://social-network.samuraijs.com/api/1.0'
const ACCESS_KEY = '6aa9dc35-6dc6-4f19-b0ef-aca7ffdb5bc7'


const apiRequest = axios.create({
    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    // `withCredentials` указывает, будут ли межсайтовые запросы контроля доступа
    // должно быть сделано с использованием учетных данных
    withCredentials: true,
    baseURL: BASE_URL,
    headers: {
        "API-KEY": ACCESS_KEY
    }
})

export const authApi = {
    getAuthStatus(){return apiRequest.get("/auth/me").then((r)=> r.data)},
    logout(){return apiRequest.delete("/auth/login").then((r)=> r.data)},
    login(email:string,password:string,rememberMe:boolean){
        return apiRequest
            .post("/auth/login",{email,password,rememberMe})
            .then((r)=> r.data)},
}