import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/api_fecher';
export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [loading, setLoading] = useState(true); // Inicializar como `true` para carregamento inicial
  const [token, setToken] = useState(localStorage.getItem('auth_token') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  
  const getToken = async (username, password) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
      const response = await api.post('/usuario/token', formData);
      const token = response.data.access_token;
      console.log(response.data)
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_id", response.data.id);
      
      setToken(token);
      const userResponse = await api.get("/usuario/user", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUser(userResponse.data);
      
      setIsAuthenticated(true);
    } catch (error) {
      if(error.message=="Network Error"){
        toast.error("Verifique a sua ligacao")
      }else if(error.message=="Request failed with status code 401"){
        toast.error("Username ou palavra-passe incoreta")
      }else{
        toast.error("Erro desconhecido")
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const signup = async (name, email, username, password) => {
    const formData = new FormData(); 
    formData.append('nome', name);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('senha', password);
    formData.append('tipo', 'nhonguista');

    try {
      const res = await api.post('/usuario/cadastro', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Define o cabeçalho de tipo de conteúdo
        }
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Cadastrado com sucesso");
      }
    } catch (err) {
      console.error("Erro no cadastro:", err.response ? err.response.data : err.message);
      toast.error("Falha no cadastro. Tente novamente.");
    }
  };

  useEffect(() => {
    console.log(token)
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.get("/usuario/user", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
          setIsAuthenticated(true);
          console.log(response.data)
        } catch (error) {
          if(error.message=="Network Error"){
            console.log("Verifique a Ligacao")
          }else if(error.status==401){
            logout(); // Se o token for inválido, faz o logout
            setIsAuthenticated(false);    
          }else{
            console.log("Ocorreu um erro")
          }
          
        }
      }
      setLoading(false); // Carregamento inicial completo
    };
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (!loading && isAuthenticated && user && window.location.pathname === '/login') {
      navigate('/');
    }
  }, [isAuthenticated, user, loading, navigate]);

  useEffect(() => {
    const interceptor = api.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    return () => {
      api.interceptors.request.eject(interceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading,
      setLoading,  
      logout,
      signup, 
      token, 
      setUser,
      getToken, 
      setToken, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
