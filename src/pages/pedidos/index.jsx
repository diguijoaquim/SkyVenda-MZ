import React, { useEffect, useState } from 'react'
import api from '../../api/api_fecher'
export default function Pedidos() {
    const [pedidos,setPedidos]=useState([])
    const [loading,setLoading]=useState(true)
    
    useEffect(()=>{
        if(!pedidos){
            setLoading(true)

            api.get('pedidos/recebidos/1').then(res=>{
                setPedidos(res.data)
                console.table(pedidos)
            }).catch(err=>{
                console.log("erro ao caregar pedidos")
            }).finally(()=>{
                setLoading(false)
            })
        }
    },[])
  return (
    <div className='p-4'>
        <div className="rounded">
            <h2>Pedidos</h2>
            {pedidos.map((pedido)=>(
                <p>{pedido}</p>
            ))}
        </div>
    </div>
  )
}
