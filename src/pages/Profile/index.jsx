import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api_fecher';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [fileimagem, setFileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [imagem, setImage] = useState(null);


  if (!user) {
    return <p>Loading...</p>;
  }
  useEffect(()=>{
    setImage(`https://skyvendamz.up.railway.app/perfil/${user?.perfil}`)
  },[user])

  async function handleImageUpload() {
        if (!fileimagem) return;

        setLoading(true);
        setMessage('');

        const formData = new FormData();
        const token = localStorage.getItem('auth_token');
        

        formData.append('file', fileimagem);

        try {
            const response = await api.put(
                `/info_usuario/perfil`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                        'accept': 'application/json',
                    },
                }
            );
            console.log('fileimagem atualizada com sucesso!');
            setFileImage(null); // Limpar a fileimagem
            console.log(response.data);
        } catch (error) {
            setMessage('Erro ao atualizar a fileimagem. Tente novamente.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-bold">Perfil</h1>
      <img src={imagem} className='rounded-full w-[100px] h-[100px] '></img>
      <p>Nome: {user?.name}</p>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <p>Total de seguidores: {user?.total_seguidores}</p>
      <p>Seguidores: {user?.seguidores}</p>
      <p>Revisado: {user?.revisado}</p>
      {user?.revisado === "pendente" ? (
        <p>
            A sua conta está sendo revisada. Veja mais detalhes em{" "}
            <Link to="/profile/review">Revisão</Link>.
        </p>
        ) : user?.revisado === "sim" ? (
        <p>
            A sua conta já foi revisada. Veja mais detalhes em{" "}
            <Link to="/profile/review">Revisão</Link>.
        </p>
        ) : (
        <p>
            Conta não revisada, envie para revisão. Veja mais detalhes em{" "}
            <Link to="/profile/review">Revisão</Link>.
        </p>
        )}

      <p>Tipo: {user?.tipo}</p>
      <p>Foto: {user?.perfil}</p>
      <p>Capa: {user?.capa}</p>

      {fileimagem && (
        <img
          src={URL.createObjectURL(fileimagem)}
          width={100}
          alt="Profile Preview"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
            setFileImage(e.target.files[0])
            setImage(URL.createObjectURL(e.target.files[0]))
        }}
        className="mt-4"
      />
      <button
        className="py-3 px-3 rounded-md bg-indigo-500 mt-4 text-white"
        onClick={handleImageUpload}
        disabled={!fileimagem || loading}
      >
        {loading ? 'Carregando...' : 'Mudar'}
      </button>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
