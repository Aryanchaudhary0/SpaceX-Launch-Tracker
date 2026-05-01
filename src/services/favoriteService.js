import axios from "axios";
import API_URL from "../config";

const BASE = `${API_URL}/api/favorites`;

export const getFavorites = (token) =>
  axios.get(BASE, { headers: { Authorization: `Bearer ${token}` } });

export const addFavorite = (token, data) =>
  axios.post(BASE, data, { headers: { Authorization: `Bearer ${token}` } });

export const removeFavorite = (token, launchId) =>
  axios.delete(`${BASE}/${launchId}`, { headers: { Authorization: `Bearer ${token}` } });