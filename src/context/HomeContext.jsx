import React, { createContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useLoading } from "./LoadingContext";
import api from "../api/api_fecher";

export const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [user_id, setUserID] = useState(localStorage.getItem('user_id') || 0);
  const { setIsLoading } = useLoading();
  const [firstTime, setFirstTime] = useState(true);

  const LoadData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulate longer loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const response = await api.get(`/produtos/?user_id=${user_id}&limit=3&offset=0`);
      setProdutos(response.data);
      console.log(response.data)
      
    } catch (err) {
      if (err.message === "Network Error" || err.message === "ERR_NETWORK") {
        toast.error("Verifique a sua rede");
        setProdutos([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user_id, setIsLoading]);

  const startLoading = useCallback(() => {
    setLoading(true);
    setIsLoading(true);
  }, [setIsLoading]);

  const stopLoading = useCallback(() => {
    // Add delay before stopping loading
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  useEffect(() => {
    LoadData();
  }, [LoadData]);

  return (
    <HomeContext.Provider 
      value={{ 
        loading, 
        loaded, 
        startLoading, 
        stopLoading, 
        produtos, 
        setProdutos,
        firstTime, 
        setFirstTime 
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;