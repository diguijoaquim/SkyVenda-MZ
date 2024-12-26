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
  const [myproducts,setMyProducts] = useState([]);
  const [sellers,setSellers] = useState([]);
  const [provinceProducts, setProvinceProducts] = useState({});


  // Função genérica para adicionar produtos de uma província
  const addProvinceProducts = useCallback((province, products) => {
    setProvinceProducts((prev) => ({
      ...prev,
      [province]: products, // Atualiza ou adiciona os produtos da província
    }));
  }, []);

  // Função para carregar produtos de uma província específica
  const loadProvinceProducts = useCallback(
    async (province) => {
      if (provinceProducts[province]) {
        console.log(`Dados de ${province} já carregados.`);
        return provinceProducts[province]; // Retorna os dados armazenados
      }

      try {
        setIsLoading(true);
        const response = await api.get(`/produtos/pesquisa/?termo=${province}`);
        addProvinceProducts(province, response.data); // Armazena os dados no estado
        console.log(`Dados de ${province} carregados com sucesso.`);
        return response.data;
      } catch (err) {
        toast.error(`Erro ao carregar dados de ${province}`);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [provinceProducts, user_id, setIsLoading, addProvinceProducts]
  );

  

  // Função para carregar os dados iniciais
  const LoadData = useCallback(async () => {
    try {
      setIsLoading(true);
      // Simulate longer loading time for better UX
      await new Promise(resolve => setTimeout(resolve, 2000));
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

  //funcoes que atualiza o estado usando os componentes filhos
  const addProducts=(products)=>setMyProducts(products)
  const addSellers=(sellers)=>setSellers(sellers)
  const addCaboProducts=(produtos)=>setcaboProduct(produtos)

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
        addOrUpdateProduto,
        myproducts,
        addProducts,
        sellers,
        addSellers,
        addProvinceProducts,
        loadProvinceProducts,
        provinceProducts,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;
