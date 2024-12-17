import React, { useState,useEffect } from 'react';
import { MapPin, Eye, Heart, Star, MessageCircle} from 'lucide-react';
import { useContext } from 'react';
import { HomeContext } from '../context/HomeContext';
import api from '../api/api_fecher';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ImageGallery from '../components/img/ImageGalery';
import CommentsModal from '../components/Dialogs/CommentModal';
import { formatPrice } from '../utils/formatters';


export default function ProductPage() {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const { slug } = useParams();
  const { loading, setLoading, produtos,addOrUpdateProduto } = useContext(HomeContext);
  const {user,isAuthenticated}  = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading2, setLoading2] = useState(loading);
  const [found,setFound]=useState(true);
  

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading2(true);
  
        // Verificar no contexto se já temos o produto
        const produtoLocal = produtos.find(p => p.slug === slug);
        if (produtoLocal) {
          setProduct(produtoLocal);
          // Registrar visualização
          await api.get(`/produtos/detalhe/${slug}`);
          setLoading2(false);
          return;
        }
        if(!product){
          setFound(false)
        }else{
          setFound(true)
        }
        // Caso não esteja no contexto, buscar da API e registrar visualização
        const response = await api.get(`/produtos/detalhe/${slug}`);
        if(!found){
          setProduct(response.data);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {loading2 ?(
        <p>Loading</p>
      ):(
        <>
        <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {product && product.images ? (
              <>
                <ImageGallery images={product.images.split(',')} />
              </>
            ) : (
              <p>Loading product details...</p> 
            )}
          </div>
          <div className="space-y-6">
          {/* header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product?.title}</h1>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{product?.province}, {product?.district}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{formatPrice(product?.price)}</p>
              <p className="text-gray-500 text-sm">Postado {product?.time}</p>
            </div>
          </div>
          {/*  */}
          <div className="flex items-center gap-6 py-4 border-y border-gray-200">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-gray-600" />
              <span>{product?.views} views</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-gray-600" />
              <span>{product?.likes} likes</span>
            </div>
            <button
              onClick={()=>setIsCommentsOpen(true)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Comments ({product?.comments?.length})</span>
            </button>
          </div>
            {/* Saller Info */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Nhonguista</h2>
              <div className="flex items-center gap-4">
                <img
                  src={`https://skyvendamz.up.railway.app/perfil/${product?.user?.avatar}`}
                  alt={product?.user?.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-lg">{product?.user?.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{'New Seller'}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* PropertyDescription */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product?.description}</p>
            </div>
          </div>
        </div>
      </div>  
      {isAuthenticated?(
        <CommentsModal 
            isOpen={isCommentsOpen} 
            onClose={() => setIsCommentsOpen(false)} 
            product={product}
            add={addOrUpdateProduto}
          />

      ):<p>fazer Login</p>}
        </>
      )}
      
    </div>
  );
}
