import React, { useContext } from "react";
import { VerificationStatus } from "./ui/VerificationStatus";
import { AuthContext } from "../../context/AuthContext";
import VerificationSkeleton from "./ui/VerificationSkeleton";

export default function Form_Perfil() {
    const { user } = useContext(AuthContext); // Obter usuário do contexto

    // Se `user` não estiver disponível, exibe um carregamento ou nada
    if (!user) {
        return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <VerificationSkeleton/>
    </div>
    }

    // Renderiza a interface com o estado de revisão do usuário
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
            <VerificationStatus estadoRevisao={user.revisado} />
        </div>
    );
}
