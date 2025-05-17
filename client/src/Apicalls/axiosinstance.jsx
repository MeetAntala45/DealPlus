import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  baseURL: "http://localhost:5000",
});
