import { AuthContext } from "../../context/AuthContext"; // the context of autentication
import { HomeContext } from "../../context/HomeContext"; // the context of the app
import { useContext,useState } from "react";
import React from "react";

export default function Perfil() {
    //usando o authContext podemos saber se o usuario esta logado ou nao 
    //tambem o mesmo tem funcoes de login,logout e mais
    //vamos recuperar o os estados do auth aqui
    const {user,isAuthenticated,logout}=useContext(AuthContext)

 return (
  <div className="p-40">
  <h1>User Data</h1>
  <pre>{JSON.stringify(user, null, 2)}</pre>
  {console.log(user)}
</div>
 );
} 