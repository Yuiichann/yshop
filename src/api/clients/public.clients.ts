import axios, { AxiosError } from 'axios';
import queryString from 'query-string';

const baseURL =
  process.env.REACT_APP_SERVER_URL || 'http://localhost:5000/api/v1';

const publicClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

publicClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
    },
  };
});

publicClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (err: AxiosError) => {
    throw err.response?.data;
  }
);

export default publicClient;
