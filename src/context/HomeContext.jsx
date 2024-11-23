
import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import api from "../api/api_fecher";

export const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [produtos,setProdutos] = useState(false);
  const [user_id,setUserID]=useState(localStorage.getItem('user_id') || 0);
  

  function LoadData(){
    api.get(`/produtos/?user_id=${user_id}&limit=3&offset=0`).then((response)=>{
      setProdutos(response.data)
    }).catch(err=>{
      if(err.message=="Network Error"){
        toast.error("Verifique a sua rede")
        setProdutos([])
      }else if(err.message=="ERR_NETWORK"){
        toast.error("Verifique a sua rede")
        setProdutos([])
      }
      
    })
  }
  const startLoading = () => setLoading(true);
  const stopLoading = () => {
    setLoading(false);
    setLoaded(true);
  };
  useEffect(()=>{    
    LoadData()
  },[])
  return (
    <HomeContext.Provider value={{ loading, loaded, startLoading, stopLoading,produtos,setProdutos }}>
      {children}
    </HomeContext.Provider>
  );
};

export default HomeProvider;