import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { useDispatch } from 'react-redux';

import useAuth from './useAuth';

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

const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: baseHeaders,
  withCredentials: true,
});

export const useHttpClient = () => {
  const { loginUser } = useAuth();
  const dispatch = useDispatch();
  const token = null;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeHttpRequests = useRef<AbortController[]>([]);

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
        const response = await instance(uri, {
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

  useEffect(() => {
    const reqInterceptor = instance.interceptors.request.use(
      (config: AxiosRequestConfig & { _retry?: boolean }) => {
        if (token && !config._retry) {
          config.headers!['Authorization'] = `Bearer ${token}`;
        }
        return config;
      }
    );

    const resInterceptor = instance.interceptors.response.use(
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
          const data = await sendRequest('/users/refresh-token');
          dispatch(loginUser({ email: '', password: '' }));
          originalRequest.headers['Authorization'] =
            'Bearer ' + data.payload.accessToken;
          return instance(originalRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(reqInterceptor);
      instance.interceptors.response.eject(resInterceptor);
    };
  }, [dispatch, loginUser, sendRequest, token]);

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
