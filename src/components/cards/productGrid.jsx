import { useEffect, useState, useContext } from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton2 } from '../skeleton/productcardskeleton2';
import { AuthContext } from '../../context/AuthContext';
import { HomeContext } from '../../context/HomeContext';
import api from '../../api/api_fecher';

export function ProductGrid() {
  const [loading, setLoading] = useState(true);
  const { myproducts, addProducts } = useContext(HomeContext);
  const { isAuthenticated, token } = useContext(AuthContext);
  const [products, setProducts] = useState([]); // Inicializado como array vazio

  const handleEdit = (id) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts); // Atualiza os produtos no contexto
    console.log('Deleted product:', id);
  };

  useEffect(() => {
    api
      .get('/produtos/produtos/?skip=0&limit=10', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // Certifica-se de que res.data é um array antes de definir o estado
        setProducts(res.data.produtos);
        console.log('Produtos recebidos:', res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar produtos:', err);
        setProducts([]); // Define como array vazio em caso de erro
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-100px)]">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Meus Produtos</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {loading ? (
          <>
            {[...Array(4)].map((_, index) => (
              <ProductCardSkeleton2 key={index} />
            ))}
          </>
        ) : (
          <>
            {products.length === 0 ? (
              <p>Nenhum produto encontrado</p>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onDelete={() => handleDelete(product.id)}
                />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
