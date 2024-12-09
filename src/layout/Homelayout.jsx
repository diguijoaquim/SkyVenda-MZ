import React,{useContext, useEffect, useState} from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header1";
import { Sidebar } from "./Sidebar";
import HomePage from "../pages/Home";
import Profile from "../pages/Profile";
export default function HomeLayout({children =<Profile/>}) {
  const {user, isAuthenticated, logout} = useContext(AuthContext);
  const [offline,setOffline]=useState(false)
  useEffect(()=>{
    window.addEventListener('offline', setOffline(true));
    window.addEventListener('online', setOffline(false));
  },[])
    
 return (
   <div>

      <Header/>
      
      <div className="md:flex">
        <div className="hidden md:block">
        <Sidebar/>
        </div>
        <div className="h-[calc(100vh-66px)] overflow-y-auto w-[100%]" > 
        {children}
        </div>
      </div>
   </div>
 );
}