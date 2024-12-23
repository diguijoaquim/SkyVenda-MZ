import { SellerCard } from '../cards/sellercard';
import api from '../../api/api_fecher';
import { AuthContext } from '../../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../../context/HomeContext';
import { SellerCardSkeleton } from '../skeleton/SellerCardSkeleton';

export function SellersGrid() {
  const {user}=useContext(AuthContext);
  const {sellers,addSellers}=useContext(HomeContext)
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    if(sellers?.length>=1){
      console.log('passou no if')
      setLoading(false)
    }else{
      api.get(`usuario/usuarios/lojas?skip=0&limit=10&identificador_unico=${user?.id_unico}`).then(res=>{
        // console.log(res.data.usuarios)
        console.log('passou no else')
        addSellers(res.data.usuarios)
      }).catch(err=>{
        console.log(err.message)
      })

    }
    
  },[sellers])
  return (
    <div className="flex justify-center py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              {Array(6).fill().map((_, index) => (
                <SellerCardSkeleton key={index} />
              ))}
            </>
          ) : (
            <>
              {sellers.map((seller) => (
                <SellerCard key={seller.id} seller={seller} />
              ))}
            </>
          )}
      </div>
    </div>
  );
}
