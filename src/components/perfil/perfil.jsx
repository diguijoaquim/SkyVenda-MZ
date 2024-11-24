import { useContext } from "react";
import React from "react";
import { AuthContext } from "../../context/AuthContext"; // Contexto de autenticação

export default function Perfil() {
    // Recupera os estados e funções do AuthContext
    const { user, isAuthenticated, logout } = useContext(AuthContext);

    // Caso o `user` não esteja definido, exibe uma mensagem de carregamento
    if (!user) {
        return (
            <div className="p-40">
                <h1>Carregando dados do usuário...</h1>
            </div>
        );
    }

    return (
        <div className="p-40">
            <h1>Dados do Usuário</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <p>
                Revisado: {user.revisado ? "Sim" : "Não"}
            </p>
        </div>
    );
}
