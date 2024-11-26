import React from "react";
import UserForm from "./ui/UserForm";
import { VerificationStatus } from "./ui/VerificationStatus";
import { useState,useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
export default function Form_Perfil() {
    
    const { user, isAuthenticated } = useContext(AuthContext);
    const [estadoRevisao, setEstadoRevisao] = useState(user?.revisado);
  return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    {user && (
        <VerificationStatus estadoRevisao={estadoRevisao} />
    )}
  </div>
  
}
