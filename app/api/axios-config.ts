import axios from 'axios';

export const BACKEND_URL =
  process.env.BACKEND_URL ?? 'https://zenith-backend-f2ip.onrender.com';

export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
