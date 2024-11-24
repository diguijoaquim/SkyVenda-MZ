import axios from "axios";

// Configuração padrão
const api = axios.create({
    baseURL: 'https://skyvendamz.onreder.com', // Altere para sua URL base
  });
  
export default api;