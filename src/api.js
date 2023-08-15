import axios from "axios";

const api = axios.create({
  baseURL: "https://messenger-api-monf.onrender.com/",
});

export default api;
