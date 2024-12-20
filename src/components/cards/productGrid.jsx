import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton2 } from '../skeleton/productcardskeleton2';

const initialProducts = [
  {
    id: '1',
    title: 'Smartphone Galaxy S21',
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500',
    price: 3499.99,
    views: 1200,
    likes: 45,
    comments: 12,
    status: 'published',
    createdAt: '2024-01-19T14:30:00Z'
  },
  {
    id: '2',
    title: 'Notebook Dell XPS 13',
    thumbnail: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
    price: 6799.99,
    views: 890,
    likes: 32,
    comments: 8,
    status: 'published',
    createdAt: '2024-01-18T10:15:00Z'
  },
  {
    id: '3',
    title: 'Apple Watch Series 7',
    thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    price: 2499.99,
    views: 650,
    likes: 28,
    comments: 5,
    status: 'draft',
    createdAt: '2024-01-17T16:45:00Z'
  },
  {
    id: '4',
    title: 'Apple Watch Series 7',
    thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    price: 2499.99,
    views: 650,
    likes: 28,
    comments: 5,
    status: 'draft',
    createdAt: '2024-01-17T16:45:00Z'
  },
  {
    id: '5',
    title: 'Apple Watch Series 7',
    thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500',
    price: 2499.99,
    views: 650,
    likes: 28,
    comments: 5,
    status: 'draft',
    createdAt: '2024-01-17T16:45:00Z'
  }
];

export function ProductGrid() {
  const [products, setProducts] = useState(initialProducts);
  const [loading,setLoading]=useState(true)

  const handleEdit = (id) => {
    console.log('Edit product:', id);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };
  useEffect(()=>{
    setTimeout(() => {
        setLoading(false)
    }, 3000);
  },[])

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-100px)] ">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Meus Produtos</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
      {loading ? (
        
        <>
        {[...Array(4)].map((_, index) => (
                  <ProductCardSkeleton2 key={index}/>
                ))}</>
    ):(
        <>
        {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}</>
    )}
        
      </div>
    </div>
  );
}