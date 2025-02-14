import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  timeout: 10000, // Set timeout (10 seconds)
  
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
