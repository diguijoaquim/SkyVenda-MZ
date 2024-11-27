import React, { useState, useEffect } from 'react';
import AdCard from './components/AdCard';
import ProductItem from './components/ProductItem';
import { PromotionalCardsSkeleton } from '../skeleton/SkeletonComponents';

const PromotionalCards = () => {
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const data = [
      {
        title: "SuperOfertas",
        subtitle: "80% de desconto por tempo limitado",
        bgColor: "from-pink-50 to-red-50",
        items: [
          {
            image: "/photo-1542291026-7eec264c27ff",
            title: "Tênis Esportivo",
            price: "2.45",
            discount: "85%"
          },
          {
            image: " /photo-1483985988355-763728e1935b",
            title: "Roupas Esportivas",
            price: "4.57",
            discount: "80%"
          },
          {
            image: " /photo-1518831959646-742c3a14ebf7",
            title: "Conjunto Infantil",
            price: "0.99",
            discount: "45%"
          }
        ]
      },
      {
        title: "Compre em atacado",
        subtitle: "Itens com valor de atacado",
        bgColor: "from-blue-50 to-purple-50",
        items: [
          {
            image: " /photo-1576566588028-4147f3842f27",
            title: "Camiseta Esportiva",
            price: "9.99",
            extra: "2+ unidades, extra 2% off"
          },
          {
            image: " /photo-1505740420928-5e560c06d30e",
            title: "Fones Bluetooth",
            price: "8.40",
            extra: "5+ unidades, extra 5% off"
          },
          {
            image: " /photo-1542272604-787c3835535d",
            title: "Jeans Premium",
            price: "7.11",
            extra: "51% off"
          }
        ]
      }
    ];

    setTimeout(() => {
      setPromotions(data);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <PromotionalCardsSkeleton />;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {promotions.map((promo, index) => (
          <AdCard
            key={index}
            title={promo.title}
            subtitle={promo.subtitle}
            bgColor={promo.bgColor}
            items={promo.items.map((item, idx) => (
              <ProductItem key={idx} {...item} />
            ))}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(PromotionalCards);