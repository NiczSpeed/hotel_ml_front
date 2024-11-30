import axios from "axios";
import router from "../router/index"
import app from "../main"


const api = axios.create({ baseURL: 'http://localhost:8081' });

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status == 401) {
            
            router.push("/");
            app.config.globalProperties.$isLogged.value = false;
            app.config.globalProperties.$isAdmin.value = false;
            sessionStorage.removeItem("token");
            return Promise.reject("Your session expired.");
        }
        else { return Promise.reject(error.response.data.message); }
    }
);

export default api;