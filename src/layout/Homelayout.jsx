import React,{useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header1";
export default function HomeLayout({children}) {
  const {user, isAuthenticated, logout} = useContext(AuthContext);
    
 return (
   <div>
    <Header/>
    <div className="flex">
    <div className=" w-[260px] bg-white/30 h-[calc(100vh-74.5px)] overflow-y-auto flex-col justify-center items-center p-2 px[5px]">
    {isAuthenticated ?(
        <div className="w-[240px] h-[45px] rounded-md hover:bg-white/60 flex items-center px-3 border-blue-200 space-x-2">
        <div className="rounded-full w-[35px] bg-indigo-300 h-[35px]">
          <img className="rounded-full w-[35px] bg-indigo-300 h-[35px]" src={`https://skyvendamz.up.railway.app/perfil/${user.perfil}`}></img>
        </div>
        <label className="font-bold">{user.name}</label>
    </div>
    ):(<></>)}

    
    <div className="w-[220px] h-[45px] rounded-md hover:bg-white/60 flex items-center px-3 border-blue-200 space-x-2">
      <div className="rounded-full w-[35px] bg-indigo-300 h-[35px]"></div>
      <label className="font-bold">Nhongistas e Lojas</label>
      </div>
    <div className="w-[220px] h-[45px] rounded-md hover:bg-white/60">
    </div>
    
        
    </div>
    <div className="h-[calc(100vh-74.5px)] overflow-y-auto w-[93%]" > 
    {children}
    </div>
   </div>
   </div>
 );
}