import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth'; 

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:5000'
    });

    instance.interceptors.request.use(config => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    }, error => Promise.reject(error));

    instance.interceptors.response.use(
        response => response,
        async error => {
            if (error.response?.status === 401 || error.response?.status === 403) {
                console.warn("Unauthorized! Logging out...");
                localStorage.removeItem('access-token');
                await logOut();
                navigate('/login');
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export default useAxiosSecure;
