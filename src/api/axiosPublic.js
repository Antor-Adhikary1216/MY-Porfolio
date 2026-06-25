import axios from "axios";

export const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:5000/api";

const axiosPublic = axios.create({
  baseURL: apiBaseUrl,
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

export default axiosPublic;
