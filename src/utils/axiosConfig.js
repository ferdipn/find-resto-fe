import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
}
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                console.log('Unauthorized, redirecting to login...');
                break;
                case 404:
                console.log('Resource not found');
                break;
                case 500:
                console.log('Internal server error');
                break;
                default:
                console.log('An error occurred');
            }
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error setting up request:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;