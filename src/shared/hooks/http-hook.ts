import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { AuthContext } from '../context/auth.context';

export enum Methods {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
}

const baseHeaders: AxiosRequestConfig['headers'] = {
  'Content-Type': 'application/json',
};

const ax = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: baseHeaders,
  withCredentials: true,
});

export const useHttpClient = () => {
  const { token } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

  useEffect(() => {
    const reqInterceptor = ax.interceptors.request.use((config) => {
      if (token) {
        config.headers!['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });
    return () => {
      ax.interceptors.request.eject(reqInterceptor);
    };
  }, [token]);

  const sendRequest = useCallback(
    async (
      uri: string,
      method: Methods = Methods.GET,
      data: AxiosRequestConfig['data'] = {},
      headers: AxiosRequestConfig['headers'] = {}
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await ax(uri, {
          method,
          data,
          headers,
          signal: httpAbortCtrl.signal,
        });
        const responseData = response.data;

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        return responseData;
      } catch (error: any) {
        let message = error && error.response && error.response.data.message;
        if (message === 'Duplicate key error') {
          const keys = Object.keys(error.response.data.errors);
          message = error.response.data.errors[keys[0]];
        }
        setError(message);
        throw error && error.response && error.response.data;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
