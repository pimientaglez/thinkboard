import axios from "axios";

// in production, the backend is served from the same origin
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000/api" : "/api";
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
