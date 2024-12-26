import React, { useState, useCallback } from 'react';
import { Heart, MapPin, Eye, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { Card } from '../ui/card';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/api_fecher';



export function ModernCard({ product }) {
  const [isLiked, setIsLiked] = useState(product.liked);
  const [likesCount, setLikesCount] = useState(product.likes);
  const { toast } = useToast();
  const navigate=useNavigate()
  const { isAuthenticated,token } = useContext(AuthContext);

  const handleLike = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(token)
    if (isAuthenticated) {
      setIsLiked((prev) => !prev);
      setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
      api.post(`/produtos/${product.slug}/like`,{},
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
        }
      );
    } else {
      navigate('/login');
      return
    }

    

    if (!isLiked) {
      toast({
        title: "Gostou 😊",
        description: `Voce gostou - ${product.title} `});
    }
  }, [isLiked, toast]);

  return (
    <Card className="group h-[400px] flex flex-col overflow-hidden rounded-xl 
    transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative h-60" onClick={()=>navigate(`/post/${product.slug}`)}>
        <img
          src={`https://skyvendamz.up.railway.app/produto/${product.thumb}`}
          onError={(e) => e.target.src = 'imagem.jpg'}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-3 top-3 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white",
            isLiked && "text-red-500"
          )}
          onClick={handleLike}
        >
          <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
        </Button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white text-sh line-clamp-2">
            {product.title}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-xs sm:text-sm">
                {product.district}, {product.province}
              </span>
            </div>
            <span className="text-sm sm:text-base font-bold text-indigo-600">
              {formatCurrency(product.price)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={`https://skyvendamz.up.railway.app/perfil/${product.user.avatar}`}
              alt={product.user.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">{product.user.name}</p>
              <p className="text-xs text-muted-foreground">{product.time}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-3 mt-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="text-xs">{product.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={cn("h-4 w-4", isLiked && "fill-current text-red-500")} />
              <span className="text-xs">{likesCount}</span>
            </div>
            <div className="flex items-center gap-1 hover:text-indigo-500
             hover:border hover:p-1 rounded-md border-indigo-400" onClick={()=>{

             }}>
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{product?.comments?.length || 0}</span>
              
            </div>
          </div>
          <button
            className="text-xs px-2 bg-indigo-500 py-2 rounded text-white"
            onClick={()=>navigate(`/post/${product.slug}`)}
          >
            Comprar
          </button>
        </div>
      </div>
      
    </Card>
  );
}