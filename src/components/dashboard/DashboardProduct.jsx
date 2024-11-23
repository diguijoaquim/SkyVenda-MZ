import React from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { FiEdit2, FiTrash2, FiShare2 } from 'react-icons/fi';

const products = {
  1: {
    name: 'Smartphone XYZ',
    price: 'MZN 15,000',
    description: 'Um smartphone avançado com câmera de alta resolução e bateria de longa duração.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
    status: 'Em estoque',
    category: 'Eletrônicos',
    rating: 4.5,
    sales: 120
  },
  2: {
    name: 'Laptop ABC',
    price: 'MZN 45,000',
    description: 'Laptop potente para trabalho e entretenimento.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853',
    status: 'Em estoque',
    category: 'Computadores',
    rating: 4.8,
    sales: 85
  },
  3: {
    name: 'Fones QWE',
    price: 'MZN 2,500',
    description: 'Fones de ouvido com cancelamento de ruído.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    status: 'Baixo estoque',
    category: 'Acessórios',
    rating: 4.2,
    sales: 200
  }
};

function DashboardProduct() {
  const { id } = useParams();
  const product = products[id];

  if (!product) {
    return (
      <DashboardLayout>
        <div className="py-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Produto não encontrado</h2>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
              <div className="mt-4 flex justify-center space-x-4">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  <FiEdit2 className="mr-2" />
                  Editar
                </button>
                <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
                  <FiTrash2 className="mr-2" />
                  Excluir
                </button>
                <button className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300">
                  <FiShare2 className="mr-2" />
                  Compartilhar
                </button>
              </div>
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Preço</p>
                  <p className="text-lg font-semibold text-gray-800">{product.price}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-semibold text-green-500">{product.status}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Categoria</p>
                  <p className="text-lg font-semibold text-gray-800">{product.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Vendas</p>
                  <p className="text-lg font-semibold text-gray-800">{product.sales} unidades</p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Descrição</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Estatísticas</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avaliação</p>
                    <p className="text-lg font-semibold text-gray-800">{product.rating}/5.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Visualizações</p>
                    <p className="text-lg font-semibold text-gray-800">1,234</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Favoritos</p>
                    <p className="text-lg font-semibold text-gray-800">89</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DashboardProduct;