import React, { createContext, useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
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

  // Função para carregar os dados iniciais
  const LoadData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulate longer loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 5000));

      const response = await api.get(`/produtos/?user_id=${user_id}&limit=1&offset=0`);
      setProdutos(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.message === "Network Error" || err.message === "ERR_NETWORK") {
        toast.error("Verifique a sua rede");
        setProdutos([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [user_id, setIsLoading]);

  // Funções auxiliares para controle de loading
  const startLoading = useCallback(() => {
    setLoading(true);
    setIsLoading(true);
  }, [setIsLoading]);

  const stopLoading = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
      setLoaded(true);
      setIsLoading(false);
    }, 1000);
  }, [setIsLoading]);

  const addOrUpdateProduto = useCallback((novoProduto) => {
    setProdutos((prevProdutos) => {
        // Procurar o produto existente pelo slug
        const produtoExistente = prevProdutos.find((p) => p.slug === novoProduto.slug);

        if (produtoExistente) {
            // Checar se algo mudou realmente no produto
            const produtoAtualizado = { ...produtoExistente, ...novoProduto };
            if (JSON.stringify(produtoExistente) !== JSON.stringify(produtoAtualizado)) {
                return prevProdutos.map((p) => 
                    p.slug === novoProduto.slug ? produtoAtualizado : p
                );
            }
            // Não fazer nada se não houve alterações
            return prevProdutos;
        }

        // Adicionar o novo produto ao array
        return [...prevProdutos, novoProduto];
    });
}, []);


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
        setFirstTime,
        addOrUpdateProduto, // Disponibilizando a função no contexto
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
