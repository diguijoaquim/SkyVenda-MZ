import React, { useState, useEffect } from 'react';
import { FiPackage, FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
const stats = [
  { label: 'Total Produtos', value: '124', icon: FiPackage, color: 'bg-blue-500' },
  { label: 'Total Clientes', value: '45', icon: FiUsers, color: 'bg-green-500' },
  { label: 'Vendas Hoje', value: 'MZN 12,450', icon: FiDollarSign, color: 'bg-yellow-500' },
  { label: 'Crescimento', value: '+24%', icon: FiTrendingUp, color: 'bg-purple-500' },
];

const products = [
  { id: 1, name: 'Smartphone XYZ', price: 'MZN 15,000', status: 'Em estoque', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9' },
  { id: 2, name: 'Laptop ABC', price: 'MZN 45,000', status: 'Em estoque', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853' },
  { id: 3, name: 'Fones QWE', price: 'MZN 2,500', status: 'Baixo estoque', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
];

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 animate-pulse">
          <div className="flex items-center">
            <div className="bg-gray-300 w-12 h-12 rounded-lg mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
              <div className="h-6 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center py-2 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-48 mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex items-center py-2 border-b border-gray-100">
            <div className="w-12 h-12 rounded-lg bg-gray-300 mr-4"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-16"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-6">
          <StatsSkeleton />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivitySkeleton />
            <ProductsSkeleton />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className={`${stat.color} p-3 rounded-lg text-white mr-4`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-semibold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4">Atividade Recente</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center py-2 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <p className="text-sm font-medium">Novo pedido #1234</p>
                    <p className="text-xs text-gray-500">Há 2 horas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-lg font-semibold mb-4">Produtos Recentes</h2>
            <div className="space-y-4">
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex items-center py-2 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-300 rounded-lg p-2"
                  onClick={() => navigate(`/dash/product/${product.id}`)}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover mr-4"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.price}</p>
                  </div>
                  <span className="text-sm text-green-500">{product.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;