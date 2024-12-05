import React,{useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header1";
export default function SearchLayout({children}) {
  const {user, isAuthenticated, logout} = useContext(AuthContext);
  const sideAds=[
    {
      title:"Casa A venda",
      descriptio:"esta casa esta a venda com ...",
      image:"https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg"
    },
    {
      title:"Toyota Mark X",
      descriptio:"o luxuoso Mark X esta  ...",
      image:"https://www.maisvendas.co.mz/images/listings/2024-03/20240308_182209jpg-1710190019-206-e.jpg"
    },
    {
      title:"Tennis 2025",
      descriptio:"faz brilhar ou seu ser ...",
      image:"https://conceitoshoes.com/cdn/shop/files/tenis-esportivo-sport-premium-tenis-esportivo-sport-premium-grupo-10-vinnci-store-cinza-laranja-37-908974_800x.jpg?v=1705602594"
    }
  ]

  const ads = [
    {
      image: "https://conceitoshoes.com/cdn/shop/files/tenis-esportivo-sport-premium-tenis-esportivo-sport-premium-grupo-10-vinnci-store-cinza-laranja-37-908974_800x.jpg?v=1705602594",
      title: "Tênis Esportivo",
      price: "2.45",
      discount: "85%"
    },
    {
      image: "https://www.maisvendas.co.mz/images/listings/2024-03/20240308_182209jpg-1710190019-206-e.jpg",
      title: "Lexus",
      price: "4.57",
      discount: "80%"
    },
    {
      image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
      title: "Conjunto Infantil",
      price: "0.99",
      discount: "45%"
    }, {
      image: "https://conceitoshoes.com/cdn/shop/files/tenis-esportivo-sport-premium-tenis-esportivo-sport-premium-grupo-10-vinnci-store-cinza-laranja-37-908974_800x.jpg?v=1705602594",
      title: "Tênis Esportivo",
      price: "2.45",
      discount: "85%"
    },
    {
      image: "https://www.maisvendas.co.mz/images/listings/2024-03/20240308_182209jpg-1710190019-206-e.jpg",
      title: "Lexus",
      price: "4.57",
      discount: "80%"
    },
    {
      image: "https://www.maisvendas.co.mz/images/listings/2024-11/medThmb/972fd7b0_2185_4cac_839e_a327906ebadajpeg-1732709411-593-e.jpeg",
      title: "Conjunto Infantil",
      price: "0.99",
      discount: "45%"
    }
  ]
    
 return (
   <div>
    <Header/>
    <div className="flex">
    <div className=" w-[320px] bg-white/30 h-[calc(100vh-74.5px)] overflow-y-auto flex-col justify-center items-center p-2 px[5px] space-y-2">
    
    <div className="w-[266px] h-[45px] rounded-md bg-white/40 hover:bg-indigo-500 hover:text-white flex items-center px-3 border-blue-200 space-x-2">
      <label className="font-bold">Tecnologia && Eletronica</label>
    </div>
    <div className="w-[266px] h-[45px] rounded-md bg-white/40 hover:bg-indigo-500 hover:text-white flex items-center px-3 border-blue-200 space-x-2">
      <label className="font-bold">Carros e Motas</label>
    </div>
    <div className="w-[266px] h-[45px] rounded-md bg-white/40 hover:bg-indigo-500 hover:text-white flex items-center px-3 border-blue-200 space-x-2">
      <label className="font-bold">Vestuarios</label>
    </div>
    <div className="w-[266px] h-[45px] rounded-md bg-white/40 hover:bg-indigo-500 hover:text-white flex items-center px-3 border-blue-200 space-x-2">
      <label className="font-bold">Sapatos</label>
    </div>
    <div className="w-[266px] h-[45px] rounded-md bg-white/40 hover:bg-indigo-500 hover:text-white flex items-center px-3 border-blue-200 space-x-2">
      <label className="font-bold">Mobiliarios</label>
    </div>
    <div className="w-[266px] h-[350px] rounded-md bg-white/30 border-blue-200 shadow-md p-4 space-y-2 overflow-y-auto">
      <label className="text-black">Melhores Boladas</label>
    {sideAds.map((item)=>(
      <div className="flex gap-2 h-[90px] bg-white/40 p-3 border rounded-md hover:bg-indigo-100">
      <img src={item.image} className="w-[80px]"></img>
      <div className="flex-col">
        <p className="font-bold">{item.title}</p>
        <label className="text-wrap text-sm text-gray-500">{item.descriptio}</label>

      </div>
    </div>
    ))}
    </div>
    </div>
  
    <div className="h-[calc(100vh-74.5px)] overflow-y-auto w-[93%]" > 
      <div className="p-5">
      <div className="bg-gradient-to-r from-pink-50/50 to-purple-50 rounded-xl p-4 shadow-sm 
        transition-all duration-300 ease-in-out">
      <div>
        <h2 className="text-xl font-bold">Super Boladas</h2>
        <p className="text-sm text-gray-600">Aproveite as melhores boladas do dia</p>
      </div>
        <div className=" flex gap-4">
        {ads.map((ad)=>(
            <div className="bg-white rounded-lg p-2 cursor-pointer hover:shadow-md 
            transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <div className="relative">
              <img
                src={ad.image}
                alt={ad.title}
                className="w-full h-24 object-cover rounded-lg mb-2"
                loading="lazy"
              />
            </div>
            <h3 className="text-xs font-medium truncate">{ad.title}</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold">{ad.price}</span>
            </div>

            </div>
            ))}
        </div>
        </div>
      </div>

    {children}
    </div>
   </div>
   </div>
 );
}