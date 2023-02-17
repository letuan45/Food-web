import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// httpClient.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("token");
//   console.log(token);
//   config.headers["access_token"] = token ? `${token}` : "";

//   return config;
// });

export default httpClient;