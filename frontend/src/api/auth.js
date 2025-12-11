import axios from "axios";

const AUTH_URL = axios.create({
  baseURL: "http://localhost:4002/api/v1/auth/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AUTH_URL;
