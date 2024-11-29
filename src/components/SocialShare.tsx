import React from 'react';
import { Share2, Heart } from 'lucide-react';

interface SocialShareProps {
  productId: number;
  likes: number;
  onLike: () => void;
  onShare: () => void;
  isLiked: boolean;
}

export function SocialShare({ productId, likes, onLike, onShare, isLiked }: SocialShareProps) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onLike}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
          isLiked
            ? 'bg-red-50 border-red-200 text-red-600'
            : 'border-gray-200 hover:bg-gray-50'
        }`}
      >
        <Heart className={isLiked ? 'fill-current' : ''} size={20} />
        <span>{likes}</span>
      </button>

      <button
        onClick={onShare}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
      >
        <Share2 size={20} />
        <span>Compartilhar</span>
      </button>
    </div>
  );
}