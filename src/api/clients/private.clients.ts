import axios from 'axios';
import queryString from 'query-string';
import authApi from '../modules/auth.api';

const baseURL =
  process.env.REACT_APP_SERVER_URL || 'http://localhost:5000/api/v1';

const privateClient = axios.create({
  baseURL,
  paramsSerializer: {
    encode: (params) => queryString.stringify(params),
  },
  withCredentials: true,
});

privateClient.interceptors.request.use(async (config: any) => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('actkn')}`,
    },
  };
});

privateClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  async (err) => {
    // kiểm tra phải lỗi token hết hạng không?
    if (
      err.response.status === 401 &&
      err.response.data.message === 'TokenExpiredError'
    ) {
      // lấy lại config của request cũ bị lỗi 401
      const originalRequest = err.config;

      const { response, error } = await authApi.resfreshToken();

      // throw lỗi của refreshToken
      // nếu có lỗi thì chắc chắn là user sẽ logout!
      if (error) {
        throw error;
      }

      if (response && response.data) {
        localStorage.setItem('actkn', response.data.accessToken);

        // set lại header của request cũ
        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;

        // gửi lại request
        return privateClient(originalRequest);
      }
    } else {
      throw err.response.data;
    }
  }
);

export default privateClient;
