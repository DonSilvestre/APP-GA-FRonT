import axios from 'axios';

// Definir a URL base para todas as requisições
const api = axios.create({
  baseURL: 'http://localhost:3000', // substitua pela URL do seu backend
});

export default api;