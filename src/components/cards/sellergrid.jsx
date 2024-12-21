import { SellerCard } from './sellercard';
import api from '../../api/api_fecher';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';


export function SellersGrid() {
  const {user}=useContext(AuthContext);
  const [sellers,setSellers]=useState([])

  useEffect(()=>{
    api.get(`https://skyvendamz.up.railway.app/usuario/usuarios/lojas?skip=0&limit=10&identificador_unico=${user?.id_unico}`).then(res=>{
      console.log(res.data.usuarios)
      setSellers(res.data.usuarios)
    }).catch(err=>{
      console.log(err.message)
    })
  },[])
  return (
    <div className="flex justify-center py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <SellerCard key={seller.id} seller={seller} />
        ))}
      </div>
    </div>
  );
}
