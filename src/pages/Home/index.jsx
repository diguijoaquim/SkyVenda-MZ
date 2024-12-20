import React, { useContext, useEffect, lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import { HomeContext } from '../../context/HomeContext';
import HomeLayout from '../../layout/Homelayout';


// Lazy load components with explicit loading chunks
const FeaturedProducts = lazy(() => 
  import(/* webpackChunkName: "featured-products" */ '../../components/FeaturedProducts')
);
const PromotionalCards = lazy(() => 
  import(/* webpackChunkName: "promotional-cards" */ '../../components/ads/Promotionalcards')
);
const PromotionalBanners = lazy(() => 
  import(/* webpackChunkName: "promotional-banners" */ '../../components/ads/Promotionalbanner')
);

export default function HomePage() {
  const { loading, stopLoading,produtos } = useContext(HomeContext);

  useEffect(() => {
    if(produtos){
      stopLoading();
    }
  }, [stopLoading]);

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-sm z-20 border-b"></div>
      <HomeLayout>
      <main className="container mx-auto px-4 py-24">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="space-y-8">
            <section>
              <PromotionalCards />
            </section>
            
            <section>
              <PromotionalBanners />
            </section>
            
            <section>
              <FeaturedProducts />
            </section>
          </div>
        </Suspense>
      </main>
      </HomeLayout>
    </div>
  );
}