import React,{useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header1";
import { Sidebar } from "../components/sidebars/mainsidebar";
import Profile from "../pages/Profile";
import CategoriesDropdown from "../components/dropdown/category";
import { FiMapPin } from "react-icons/fi";
export default function HomeLayout({children =<Profile/>}) {
  
  const [offline,setOffline]=useState(false)
  useEffect(()=>{
    window.addEventListener('offline', setOffline(true));
    window.addEventListener('online', setOffline(false));
  },[])
    
 return (
   <div>      
      <div className="md:flex">
        <div className="hidden md:block">
        <Sidebar/>
        </div>
        <div className="h-[100vh]  w-[100%]" >   
        <Header/>
        <div className="h-[100vh] w-full overflow-y-auto">
        
        {children}
        </div>
        </div>
      </div>
   </div>
 );
}