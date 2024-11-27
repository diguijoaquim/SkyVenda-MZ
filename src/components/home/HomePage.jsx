import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { HomeContext } from '../../context/HomeContext';

const FeaturedProducts = lazy(() => import('../FeaturedProducts'));
const PromotionalCards = lazy(() => import('../ads/Promotionalcards'));
const PromotionalBanners = lazy(() => import('../ads/Promotionalbanner'));

export default function HomePage() {
  const { loading, stopLoading } = useContext(HomeContext);

  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-sm z-20 border-b"></div>
      <main className="container mx-auto px-4 py-24">
        <Suspense fallback={<div>Carregando anúncios...</div>}>
          <PromotionalCards />
          <PromotionalBanners />
        </Suspense>
        <Suspense fallback={<div>Carregando produtos...</div>}>
          <FeaturedProducts />
        </Suspense>
      </main>
    </div>
  );
}
