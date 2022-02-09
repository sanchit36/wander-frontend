import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig & { _retry?: boolean }) => {
    const token = localStorage.getItem('xid');
    if (token && !config._retry) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 403 &&
      error.response.data.message === 'jwt expired' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const response = await api.get('/users/refresh-token');
      const data = response.data;
      localStorage.setItem('xid', data.payload.accessToken);
      originalRequest.headers['Authorization'] =
        'Bearer ' + data.payload.accessToken;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
