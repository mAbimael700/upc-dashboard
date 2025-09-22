import axios from 'axios';

const ApiHttpClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/upc/api/v1`,  // URL base de la API
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,  // Configuración de tiempo de espera
});

// Interceptores de respuesta o petición, si es necesario
ApiHttpClient.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
);

export default ApiHttpClient;