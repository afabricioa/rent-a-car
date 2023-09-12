import axios from "axios";
import { userStore } from "./store/userStore";

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
});

axiosClient.interceptors.request.use(config => {
    const storeUser = userStore();

    config.headers.Authorization = `Bearer ${storeUser.user.token}`;

    return config;
})

export default axiosClient
