import axios from "axios";

const BACKEND_URL = axios.create({
  baseURL: "http://localhost:4002/api/v1/noteapp/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default BACKEND_URL;
