import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import SponsoredProductCard from './SponsoredProductCard';
import adsData from '../data/ads.json';
import Skeleton from './Skeleton';
import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';
import ProgressRing from './loaders/ProgressRingtailwindcss';
import { AuthContext } from '../context/AuthContext';
import api from '../api/api_fecher';

function FeaturedProducts() {
  const { loading, produtos, setProdutos } = useContext(HomeContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const observer = useRef();
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false); // Ref para controlar o estado real de loading

  const LoadData = useCallback(async () => {
    // Verifica se já está carregando usando a ref
    if (!hasMore || loadingRef.current) return;

    try {
      loadingRef.current = true; // Marca como carregando usando a ref
      setLoadingMore(true);

      const response = await api.get(
        `/produtos/?user_id=${isAuthenticated ? user.id : 0}&limit=3&offset=${page}`
      );

      if (!response.data || response.data.length === 0) {
        setHasMore(false);
        return;
      }

      setProdutos((prevProdutos) => {
        const existingIds = new Set((prevProdutos || []).map((produto) => produto.id));
        const uniqueProducts = response.data.filter(
          (produto) => !existingIds.has(produto.id)
        );
        return [...(prevProdutos || []), ...uniqueProducts];
      });

      setPage((prevPage) => prevPage + 1);

      if (response.data.length < 3) {
        setHasMore(false);
      }
    } catch (err) {
      if (err.message === 'Network Error' || err.message === 'ERR_NETWORK') {
        setHasMore(false);
      }
      setHasMore(false);
    } finally {
      setLoadingMore(false);
      loadingRef.current = false; // Marca como não carregando usando a ref
    }
  }, [page, setProdutos, hasMore, isAuthenticated, user]);

  const handleScroll = useCallback(() => {
    if (loadingRef.current) return; // Verifica o estado de loading usando a ref

    const offset = 100; // Aumentado para evitar triggers muito próximos
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= documentHeight - offset && hasMore) {
      LoadData();
    }
  }, [LoadData, hasMore]);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 250); // Adiciona debounce no scroll
    window.addEventListener('scroll', debouncedScroll);
    return () => {
      window.removeEventListener('scroll', debouncedScroll);
    };
  }, [handleScroll]);

  // Função de debounce para evitar múltiplas chamadas
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const lastProductRef = useCallback(
    (node) => {
      if (loading || loadingRef.current || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
          LoadData();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, LoadData]
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Produtos em Destaque
        </h2>
        <Skeleton type="product" />
      </div>
    );
  }

  const renderProductOrAd = (product, index, isLast) => {
    if (index === 10) {
      return (
        <SponsoredProductCard
          key={`sponsored-${index}`}
          product={adsData.ads[Math.floor(Math.random() * adsData.ads.length)]}
        />
      );
    }

    return (
      <div ref={isLast ? lastProductRef : null} key={`${product.slug}`}>
        <ProductCard product={product} />
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Produtos em Destaque
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {produtos &&
          produtos.map((product, index) =>
            renderProductOrAd(product, index, index === produtos.length - 1)
          )}
      </div>
      {loadingMore && (
        <div className="flex justify-center items-center p-4">
          <ProgressRing />
        </div>
      )}
      {!hasMore && produtos.length > 0 && (
        <div className="text-center mt-8 text-gray-600">
          Não há mais produtos para carregar
        </div>
      )}
    </div>
  );
}

export default FeaturedProducts;