// composables/useAxios.js
import axios from 'axios';
import { useRuntimeConfig } from '#imports';

export const useAxios = () => {
  const config = useRuntimeConfig();
  const axiosInstance = axios.create({
    baseURL: config.public.apiBaseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return axiosInstance;
};
