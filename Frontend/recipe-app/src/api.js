import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.VITE_BACKEND_URL,
    headers : {
        'Content-Type' : 'application/json',
    }
});

let accessToken = localStorage.getItem('token');

export const setAccessToken = (token) => {
    accessToken = token;
    localStorage.setItem('token',token);
}

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
},(error) => {
    return Promise.reject(error);
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;

            try{
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/refresh`,{},{
                    withCredentials:true,
                })

                const newAccessToken = response.data.accessToken;
                setAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            }catch(refreshError){
                localStorage.removeItem('token');
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
)


export default api;