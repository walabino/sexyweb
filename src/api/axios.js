import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://192.168.100.99:8800/api/",
});
export const makeRequestAuth = axios.create({
  baseURL: "http://192.168.100.99:8800/api/",
  withCredentials: true,
});
