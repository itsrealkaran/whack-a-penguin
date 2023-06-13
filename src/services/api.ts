import axios from "axios";

export const API = axios.create({
  baseURL: import.meta.env.VITE_WHACK_LOCAL_SERVER,
});
