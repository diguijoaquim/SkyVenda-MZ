import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import ProductCard from './ProductCard';
import SponsoredProductCard from './SponsoredProductCard';
import adsData from '../data/ads.json';
import Skeleton from './Skeleton';
import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';
import ModernCardSkeleton from './skeleton/ModernCardSkeleton'
import { AuthContext } from '../context/AuthContext';
import api from '../api/api_fecher';
import { ModernCard } from './cards/ModernCard';

// Memoized ProductCard wrapper
const MemoizedProductCard = memo(ModernCard);
const MemoizedSponsoredCard = memo(SponsoredProductCard);

// Memoized product renderer
const ProductRenderer = memo(({ product, isLast, lastProductRef }) => (
  <div ref={isLast ? lastProductRef : null} key={product.slug}>
    <MemoizedProductCard product={product} />
  </div>
));

function FeaturedProducts() {
  const { loading, produtos, setProdutos } = useContext(HomeContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);
  const previousProductsRef = useRef([]);

  // Intersection Observer setup
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  const LoadData = useCallback(async () => {
    if (!hasMore || loadingRef.current) return;

    try {
      loadingRef.current = true;
      setLoadingMore(true);

      const response = await api.get(
        `/produtos/?user_id=${isAuthenticated ? user.id : 0}&limit=3&offset=${page}`
      );

      if (!response.data || response.data.length === 0) {
        setHasMore(false);
        return;
      }

      setProdutos((prevProdutos) => {
        const existingIds = new Set(prevProdutos?.map(produto => produto.id) || []);
        const uniqueProducts = response.data.filter(produto => !existingIds.has(produto.id));
        const newProducts = [...(prevProdutos || []), ...uniqueProducts];
        previousProductsRef.current = newProducts;
        return newProducts;
      });

      setPage(prev => prev + 1);
      setHasMore(response.data.length === 3);

    } catch (err) {
      console.error('Error loading data:', err);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
      loadingRef.current = false;
    }
  }, [page, setProdutos, hasMore, isAuthenticated, user?.id]);

  useEffect(() => {
    if (inView && hasMore && !loadingRef.current) {
      LoadData();
    }
  }, [inView, hasMore, LoadData]);

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
        <MemoizedSponsoredCard
          key={`sponsored-${index}`}
          product={adsData.ads[Math.floor(Math.random() * adsData.ads.length)]}
        />
      );
    }

    return (
      <ProductRenderer
        key={product.slug}
        product={product}
        isLast={isLast}
        lastProductRef={loadMoreRef}
      />
    );
  };

  return (
    <div className="container mx-auto px-4 mb-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Produtos em Destaque
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {produtos?.map((product, index) =>
          renderProductOrAd(
            product,
            index,
            index === produtos.length - 1
          )
        )}
      </div>
      {loadingMore && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
        {[...Array(4)].map((_, index) => (
          <ModernCardSkeleton key={index} />
        ))}
        </div>
      )}

      {!hasMore && produtos?.length > 0 && (
        <div className="text-center mt-8 text-gray-600">
          Não há mais produtos para carregar
        </div>
      )}
    </div>
  );
}

export default memo(FeaturedProducts);