import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.followus.link",
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default axiosInstance;
