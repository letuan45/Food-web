import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://be-fastfood-production.up.railway.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default httpClient;