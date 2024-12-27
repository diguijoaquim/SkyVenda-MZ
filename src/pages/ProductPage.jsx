import React, { useState, useEffect } from 'react';
import { 
  MapPin, Eye, Heart, Star, MessageCircle, ChevronLeft, ChevronRight, X,
  Package, Shield, Truck, Share2, AlertCircle, Phone, Mail, ShoppingCart,Loader2
} from 'lucide-react';
import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';
import api from '../api/api_fecher';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { formatPrice } from '../utils/formatters';
import axios from 'axios';

// Gallery Component
function ProductGallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);
  const validImages = images.filter(Boolean);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % validImages.length);
  };

  const previousImage = () => {
    setCurrentImage((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  if (!validImages.length) return null;

  return (
    <div className="relative">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
        <img
          src={`https://skyvendamz.up.railway.app/produtos/${validImages[currentImage]}`}
          alt={`Product image ${currentImage + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      
      {validImages.length > 1 && (
        <>
          <button
            onClick={previousImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {validImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`flex-none ${
              currentImage === index ? 'ring-2 ring-indigo-600' : ''
            }`}
          >
            <img
              src={`https://skyvendamz.up.railway.app/produtos/${image}`}
              alt={`Thumbnail ${index + 1}`}
              className="h-16 w-16 rounded-lg object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Comments Dialog Component
function CommentsDialog({ isOpen, onClose, product, add }) {
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await api.post(`/produtos/${product.id}/comments`, {
        text: newComment
      });

      const updatedProduct = {
        ...product,
        comments: [...product.comments, response.data]
      };
      add(updatedProduct);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Comments</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {product.comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <img
                src={`https://skyvendamz.up.railway.app/perfil/${comment.user.avatar}`}
                onError={(e) => e.target.src = 'imagem.jpg'}
                alt={comment.user.name}
                className="w-10 h-10 rounded-full flex-none"
              />
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{comment.user.name}</span>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-600"
            rows={3}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
}

// Contact Dialog Component
function ContactDialog({ isOpen, onClose, seller }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Contact Seller</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-600" />
            <a href="tel:+258840000000" className="text-blue-600 hover:underline">
              +258 84 000 0000
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <a href={`mailto:${seller?.email}`} className="text-blue-600 hover:underline">
              {seller?.email || 'contact@example.com'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main ProductPage Component
export default function ProductPage() {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { slug } = useParams();
  const { loading, produtos, addOrUpdateProduto } = useContext(HomeContext);
  const { user, isAuthenticated } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading2, setLoading2] = useState(loading);
  const [found, setFound] = useState(true);
  const [loadingPedido,setLoadingpedido] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading2(true);
        const produtoLocal = produtos.find(p => p.slug === slug);
        
        if (produtoLocal) {
          setProduct(produtoLocal);
          setIsLiked(produtoLocal.liked);
          await api.get(`/produtos/detalhe/${slug}`);
          setLoading2(false);
          return;
        }

        if (!product) {
          setFound(false);
        } else {
          setFound(true);
        }

        const response = await api.get(`/produtos/detalhe/${slug}`);
        if (!found) {
          setProduct(response.data);
          setIsLiked(response.data.liked);
          setLoading2(false);
          addOrUpdateProduto(response.data);
        }
      } catch (err) {
        console.log("Erro ao buscar detalhes do produto:", err.message);
        setLoading2(false);
      }
    }

    fetchProduct();
  }, [slug, produtos]);

  const handleLike = async () => {
    if (!isAuthenticated) return;
    
    try {
      await api.post(`/produtos/${product.id}/like`);
      setIsLiked(!isLiked);
      const updatedProduct = {
        ...product,
        likes: isLiked ? product.likes - 1 : product.likes + 1,
        liked: !isLiked
      };
      addOrUpdateProduto(updatedProduct);
    } catch (error) {
      console.error('Error liking product:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href
      });
    }
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      // Handle not authenticated
      return;
    }
    
    try {
      await api.post(`/produtos/${product.id}/order`, { quantity });
      // Handle successful order
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  if (loading2) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  function fazerPedido(user,product){
    setLoadingpedido(true)
    axios.post('/').finally(()=>setLoadingpedido(false))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {product && product.images && (
              <ProductGallery images={product.images.split(',')} />
            )}
            
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="w-full flex items-center justify-center gap-2 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <Share2 className="w-5 h-5" />
              <span>Share Product</span>
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>
                  {product?.state === 'novo' && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{product?.province}, {product?.district}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">{formatPrice(product?.price)}</p>
                <p className="text-gray-500 text-sm">Posted {product?.time}</p>
              </div>
            </div>

            {/* Product Stats */}
            <div className="flex items-center gap-6 py-4 border-y border-gray-200">
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 p-1 rounded-full px-3 transition-colors ${
                  isLiked 
                    ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Heart className={isLiked ? 'fill-current' : ''} />
                <span>{product?.likes}</span>
              </button>
              <div className="flex items-center gap-2 bg-gray-200 p-1 rounded-full px-3">
                <Eye className="w-5 h-5 text-gray-600" />
                <span>{product?.views}</span>
              </div>
              <button
                onClick={() => setIsCommentsOpen(true)}
                className="flex items-center gap-2 bg-gray-200 p-1 rounded-full px-3 hover:bg-gray-100"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{product?.comments?.length}</span>
              </button>
            </div>

            {/* Buy Section */}
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Quantity</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => Math.min(product.stock_quantity, q + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Stock available</span>
                <span>{product?.stock_quantity} units</span>
              </div>

              {product?.stock_quantity < 5 && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-2 rounded-lg">
                  <AlertCircle className="w-5 h-5" />
                  <span className="text-sm">Only {product.stock_quantity} items left!</span>
                </div>
              )}

              <div className="space-y-3">
                <button 
                  onClick={handleBuyNow}
                  className="w-full py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold text-lg transition-colors flex items-center justify-center gap-2"
                >
                  Comprar Agora
                </button>
                <button onClick={fazerPedido} className="w-full py-4 border-2 border-indigo-600 text-indigo-600 rounded-lg
                 hover:bg-indigo-50 font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  {loadingPedido ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>processando...</span></>
                  ):(
                    <>
                    <ShoppingCart className="w-5 h-5" />
                    Fazer Pedido
                    </>
                  )}
                </button>
              </div>

              {/* Purchase Benefits */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Shield className="w-5 h-5" />
                  <span>Secure Purchase</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Truck className="w-5 h-5" />
                  <span>Fast Delivery Available</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Package className="w-5 h-5" />
                  <span>Quality Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Nhonguista</h2>
              <div className="flex items-center gap-4">
                <img
                  src={`https://skyvendamz.up.railway.app/perfil/${product?.user?.avatar}`}
                  onError={(e) => e.target.src = 'imagem.jpg'}
                  alt={product?.user?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-lg">{product?.user?.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{'New Seller'}</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {product?.description}
              </p>
              
              {/* Product Details */}
              <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-medium">{product?.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">{product?.category}</p>
                </div>
                {product?.details && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-500">Additional Details</p>
                    <p className="font-medium">{product?.details}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isAuthenticated ? (
        <>
          <CommentsDialog
            isOpen={isCommentsOpen}
            onClose={() => setIsCommentsOpen(false)}
            product={product}
            add={addOrUpdateProduto}
          />
          <ContactDialog
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            seller={product?.user}
          />
        </>
      ) : (
        <p className="text-center mt-4">Please login to interact</p>
      )}
    </div>
  );
}