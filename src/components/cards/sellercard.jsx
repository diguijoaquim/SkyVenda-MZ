import { useState } from "react";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Heart, ShoppingBag, UserPlus, Star } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api_fecher";
import { useToast } from "../../hooks/use-toast";

export function SellerCard({ seller }) {
  const [isFollowing, setIsFollowing] = useState(seller.segue_usuario);
  const [likes, setLikes] = useState(0); // Likes não existem no novo JSON, inicializamos como 0.
  const [isLiked, setIsLiked] = useState(false);
  const {user,token}=useContext(AuthContext)
  const { toast } = useToast();
  

  const handleFollow = (seller) => {
    api.post(`usuario/${seller?.id}/seguir`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((res) => {
        setIsFollowing(!isFollowing);
        if (res.data) {
            toast({
                title: `🙌 Você começou a seguir ${seller.name}! 🎯`,
                description: '',
            });
        } else {
            toast({
                title: `⚠️ Você deixou de seguir ${seller.name}. 😔`,
                description: '',
            });
        }
    })
    .catch((err) => {
        console.error(err); // Log do erro para depuração
        toast({
            title: "❌ Algo deu errado!",
            description: `Não foi possível atualizar o status de seguimento.`,
        });
    });
};



  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Card className="w-full max-w-sm transition-all hover:shadow-lg bg-white">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage
            src={`https://skyvendamz.up.railway.app/perfil/${seller.foto_perfil}`}
            alt={seller.name}
          />
          <AvatarFallback>{seller.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">{seller.name}</h3>
            {seller.conta_pro && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                <Star className="h-3 w-3 mr-1 fill-yellow-500" /> PRO
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 stroke-yellow-400" />
            <span>{seller.media_estrelas.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground mb-4">
          <span>{seller.total_seguidores} seguidores</span>
          <span>{seller.total_produtos} produtos</span>
          <span>{likes} likes</span>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button
          variant={isFollowing ? "secondary" : "default"}
          className="w-full"
          onClick={()=>handleFollow(seller)}
        >
          <UserPlus className="h-4 w-4 mr-2" />
          {isFollowing ? "Seguindo" : "Seguir"}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleLike}
        >
          <Heart
            className={`h-4 w-4 mr-2 ${
              isLiked ? "fill-red-500 stroke-red-500" : ""
            }`}
          />
          Like
        </Button>
        <Button variant="outline" className="w-full">
          <ShoppingBag className="h-4 w-4 mr-2" />
          Produtos
        </Button>
      </CardFooter>
    </Card>
  );
}
