import axios from "axios";

const NOTES_URL = axios.create({
  baseURL: "http://localhost:4002/api/v1/noteapp/"
});

export default NOTES_URL;
