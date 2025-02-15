import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:3000",
  
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*", // Allow all origins (for dev only)

  },
});

export default axiosInstance;
