import axios from "axios";

const BACKEND_URL = axios.create({
  baseURL: "https://mynotes-backend-2dwp.onrender.com/api/v1/noteapp/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default BACKEND_URL;
