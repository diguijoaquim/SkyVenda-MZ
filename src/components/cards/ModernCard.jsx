import React, { useState, useCallback } from 'react';
import { Heart, MapPin, Eye, MessageCircle } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import { Card } from '../ui/card';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';
import { useToast } from '../../hooks/use-toast';


export function ModernCard({ product }) {
  const [isLiked, setIsLiked] = useState(product.liked);
  const [likesCount, setLikesCount] = useState(product.likes);
  const { toast } = useToast();

  const handleLike = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    if (!isLiked) {
      toast({
        title: "Adicionado aos favoritos",
        description: "Este imóvel foi adicionado à sua lista de favoritos."
      });
    }
  }, [isLiked, toast]);

  return (
    <Card className="group h-[400px] flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <div className="relative h-60">
        <img
          src={'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80'}
          alt={product.nome}
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
            {product.nome}
          </h3>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-xs sm:text-sm">
                {product.distrito}, {product.provincia}
              </span>
            </div>
            <span className="text-sm sm:text-base font-bold text-indigo-600">
              {formatCurrency(product.preco)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <img
              src={`https://skyvendamz.up.railway.app/perfil/${product.usuario.foto}`}
              alt={product.usuario.nome}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">{product.usuario.nome}</p>
              <p className="text-xs text-muted-foreground">{product.tempo}</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t pt-3 mt-3">
          <div className="flex items-center gap-3 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span className="text-xs">{product.view}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className={cn("h-4 w-4", isLiked && "fill-current text-red-500")} />
              <span className="text-xs">{likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{product.comentario}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Ver Detalhes
          </Button>
        </div>
      </div>
    </Card>
  );
}