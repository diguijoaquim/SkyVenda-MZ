import axios from "axios";

// Configuração padrão
const api = axios.create({
    baseURL: 'http://192.168.1.62:8000', // Altere para sua URL base
  });
  
export default api;