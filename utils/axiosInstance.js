import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://followus.link",
  
  headers: {
    "Content-Type": "application/json",
    'Content-Type': 'multipart/form-data',
    
    "Access-Control-Allow-Origin": "https://followus.link", // Allow all origins (for dev only)

  },
});

export default axiosInstance;
