import axios from 'axios';
import authService from './auth-service';

class AxiosService {
  axiosInstance = {};

  constructor() {
    this.initInstance();
  }

  initInstance() {
    this.axiosInstance = axios.create({
      baseURL: 'https://diplom-room-book.herokuapp.com/api/v1/',
      timeout: 20000
    });

    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = authService.getToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;/* eslint-disable-line */
        }

        return config;
      }
    );

    return this.axiosInstance;
  }

  getInstance() {
    return this.axiosInstance || this.initInstance();
  }
}

export default new AxiosService();
