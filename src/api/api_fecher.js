import axios from "axios";

// Configuração padrão
const api = axios.create({
    baseURL: 'https://skyvendamz.up.railway.app', // Altere para sua URL base
  });
  
export default api;