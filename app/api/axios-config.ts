import axios from 'axios';

export const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:3000';
export const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});
