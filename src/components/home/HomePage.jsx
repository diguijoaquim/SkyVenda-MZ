import React, { useContext, useEffect } from 'react';
import FeaturedProducts from '../FeaturedProducts';
import { HomeContext } from '../../context/HomeContext'; // Certifique-se de que o caminho está correto

export default function HomePage() {
  const { loading, startLoading, stopLoading } = useContext(HomeContext);

  useEffect(() => {
    const loadData = () => {
      
      const timer = setTimeout(() => {
        stopLoading(); // Para o carregamento após 2 segundos
      }, 5000);

      return () => clearTimeout(timer); // Limpa o timer ao desmontar
    };

    loadData(); // Chama a função para simular o carregamento
  }, [startLoading, stopLoading]);

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-sm z-20 border-b">
      {/* <Stories stories={stories}/> */}
      </div>
      <main className="container mx-auto px-4 py-8">
        <FeaturedProducts />
      </main>
    </div>
  );
}
