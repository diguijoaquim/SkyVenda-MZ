import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Skeleton from "../../Skeleton";
import ProductCard from "../../ProductCard";
import api from "../../../api/api_fecher";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // Obtém o termo de busca da URL
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/produtos/pesquisa/?termo=${query}&page=1&limit=10&&user_id=1`);
        setProducts(response.data);
      } catch (err) {
        setError("Erro ao carregar os resultados. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="p-4">
      {loading ? (
        <Skeleton />
      ) : error ? (
        <div className="text-red-500 text-center">
          <p>{error}</p>
        </div>
      ) : products.length > 0 ? (
        <>
          <h1 className="text-xl font-bold mb-4">Resultado de busca</h1>
          <p className="mb-6">Você pesquisou por: <strong>{query}</strong></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-gray-600 text-center">
          <p>Nenhum resultado encontrado para: <strong>{query}</strong></p>
        </div>
      )}
    </div>
  );
};

export default Search;
