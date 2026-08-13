export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||  "https://g2g-services-api.onrender.com";

export const apiUrl = (path) =>
  `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
