import axios from "axios";

// Configuração padrão
const api = axios.create({
    baseURL: 'https://skyvendamz.onrender.com', // Altere para sua URL base
  });
  
export default api;