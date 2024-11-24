import { AuthContext } from "../../context/AuthContext"; // the context of autentication
import { HomeContext } from "../../context/HomeContext"; // the context of the app
import { useState } from "react";
import React,{ useContext } from "react";

export default function Perfil() {
    //usando o authContext podemos saber se o usuario esta logado ou nao 
    //tambem o mesmo tem funcoes de login,logout e mais
    //vamos recuperar o os estados do auth aqui
    const {user,isAuthenticated,logout}=useContext(AuthContext)

 return (
   <div className="p-40">
    <h1 className="font-bold">Ola Perfil</h1>
        {isAuthenticated && (
            <h1>{user.revidado}</h1>
        )}
   </div>
 );
}