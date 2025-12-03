import axios from "axios";

// Make sure you have REACT_APP_BASE_URL set in your frontend .env file like:
// REACT_APP_BASE_URL=http://localhost:5000
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,  // base URL set here
});

export const apiConnector = (method, url, data = null, config = {}) => {
  const finalConfig = {
    method,
    url,          // relative path, e.g. "/api/v1/auth/signup"
    data,
    withCredentials: true,
    ...config,
  };

  console.log("API Connector Config:", finalConfig);

  return axiosInstance(finalConfig);
};
