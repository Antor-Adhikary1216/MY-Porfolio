import axios from "axios";
import { auth } from "../firebase/firebase.config";
import { apiBaseUrl } from "./axiosPublic";

const axiosSecure = axios.create({
  baseURL: apiBaseUrl,
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

axiosSecure.interceptors.request.use(
  async (config) => {
    const token = await auth?.currentUser?.getIdToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosSecure;
