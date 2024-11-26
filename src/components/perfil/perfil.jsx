import Recat,{ useState,useContext,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import React from "react";
export default function Perfil() {
    const { user, isAuthenticated } = useContext(AuthContext);
 return (
   <div>
    <p>perfil</p>
    <p>nome: {user?.name}</p>
    <p>name: {user?.name}</p>
    <p>name: {user?.name}</p>
    <p>name: {user?.name}</p>
    <p>name: {user?.name}</p>
    <p>name: {user?.name}</p>
    <br></br>
    <p>{user?.revisado}</p>
   </div>
   
 );
}