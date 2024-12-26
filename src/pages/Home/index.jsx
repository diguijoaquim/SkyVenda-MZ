import React, { useContext, useEffect, lazy, Suspense } from 'react';
import LoadingSpinner from '../../components/loaders/LoadingSpinner';
import { HomeContext } from '../../context/HomeContext';
import HomeLayout from '../../layout/Homelayout';
import CategoriesDropdown from '../../components/dropdown/category';
import { FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ProvinceDropdown } from '../../components/dropdown/province';
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
  const provincia="Cabo"

  return (
    <div>
      <div className="bg-white/80 backdrop-blur-sm z-20 border-b"></div>
      <HomeLayout>
      <main className="container mx-auto px-4 py-2">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="">
            <section>
              <div className="p-4 flex gap-3">
            <CategoriesDropdown/>

            <div className="hover:bg-white/50 rounded-full flex items-center justify-center w-[230px]">
              <label className="font-extrabold text-gray-600">Melhores Boladas</label>
            </div>
            <ProvinceDropdown/>
          </div>
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