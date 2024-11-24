import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiShoppingCart, FiHeart, FiStar } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';
import axios from 'axios';


function formatPrice(price) {
  return new Intl.NumberFormat('pt-MZ', { style: 'currency', currency: 'MZN' })
    .format(price)
    .replace('MTn', 'MZN'); // Substitui MTn por MZN, se necessário
}

function ProductPage() {
  const { slug } = useParams();
  const { loading, setLoading, produtos } = useContext(HomeContext);
  const [product, setProduct] = useState(null);
  const [loading2, setLoading2] = useState(loading);

  useEffect(() => {
    async function fetchProduct() {
      if (produtos.length > 0) {
        setLoading2(true)
        const produto = produtos.find(p => p.slug === slug);
        if (produto) {
          setProduct(produto);
        }
      }
      setLoading2(false);
      axios.get(`produtos/detalhes/${slug}`)
    }

    fetchProduct();
  }, [slug, produtos]);

  const handleAddToCart = () => {
    toast.success(`${product?.nome || 'Produto'} adicionado ao carrinho!`);
  };

  if (loading2) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-64 w-full mb-4"></div>
          <div className="bg-gray-300 h-8 w-3/4 mb-4"></div>
          <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
          <div className="bg-gray-300 h-32 w-full"></div>
        </div>
      </div>
    );
  }

  if (!product && !loading2) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          {product.capa ? (
            <img
              src={`https://skyvendamz.up.railway.app/produto/${product.capa}`}
              alt={product.nome}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          ) : (
            <div className="bg-gray-300 h-64 w-full rounded-lg shadow-lg flex items-center justify-center">
              <span>Imagem não disponível</span>
            </div>
          )}
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.nome}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
              ))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-4">{formatPrice(product.preco)}</p>
          <p className="text-gray-700 mb-6">{product.descricao}</p>
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center cursor-pointer"
            >
              <FiShoppingCart className="mr-2" />
              Adicionar ao Carrinho
            </button>
            <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300 cursor-pointer">
              <FiHeart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
