import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://linktreenew.vercel.app",
  
  headers: {
    "Content-Type": "application/json",
    'Content-Type': 'multipart/form-data',
    
    "Access-Control-Allow-Origin": "*", // Allow all origins (for dev only)

  },
});

export default axiosInstance;
