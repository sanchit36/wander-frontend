import { useCallback, useEffect, useRef, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

export enum Methods {
  'GET' = 'GET',
  'POST' = 'POST',
  'PUT' = 'PUT',
  'PATCH' = 'PATCH',
  'DELETE' = 'DELETE',
}

export const useHttpClient = () => {
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
        const response = await axios(uri, {
          baseURL: 'http://localhost:5000/api',
          method,
          data,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          withCredentials: true,
          signal: httpAbortCtrl.signal,
        });
        const responseData = response.data;

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        return responseData;
      } catch (error: any) {
        setError(error.message);
        throw error;
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
