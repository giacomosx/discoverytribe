import axios from 'axios';

const manualToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjYxZmQyMGYxMTM5NTQyMDA4Yjk0YjkiLCJlbWFpbCI6InRlc3Q0QGdtYWlsLmNvbSIsImlhdCI6MTcxODQ0NzI4MiwiZXhwIjoxNzE4NDUwODgyfQ.R5tSE8m2t06lFO5nrJrQ3HpkH7MzxpkB-PUM67p8aqY'

class AxiosApi {
    constructor() {
        const baseUrl = process.env.REACT_APP_BASE_SERVER_URL;
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            headers : {
                'Content-Type': 'application/json',
            }
        })
        this.axiosInstance.interceptors.request.use((config) => {
            const token = localStorage.getItem("token") || manualToken;
            if (token) {
                config.headers.Authorization = 'Bearer '+ token;
            }
            return config;
        }, (error) => {
            return Promise.reject(error);
        })
    }
    async get(url, config = {}) {
        try {
            const response = await this.axiosInstance.get(url, {
                ...config,
                headers: {
                    ...this.axiosInstance.defaults.headers,
                    ...config.headers
                }
            });
            return response.data;
        } catch (e) {
            return Promise.reject(e.response.data);
        }
    }

    async post(url, body, config = {}) {
        const response = await this.axiosInstance.post(url, body, {
            ...config,
            headers: {
                ...this.axiosInstance.defaults.headers,
                ...config.headers
            }
        });
        return response.data;
    }

    async put(url, body, config) {
            const response = await this.axiosInstance.post(url, body, config);
            return response.data;
    }

    async patch(url, body, config) {
        const response = await this.axiosInstance.post(url, body, config);
        return response.data;
    }

    async delete(url, config) {
            const response = await this.axiosInstance.post(url, config);
            return response.data;
        }
}

export default AxiosApi;