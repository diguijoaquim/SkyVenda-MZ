import React from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineIndicator() {
  return (
    <div className="w-full p-2">
      <div className="w-full rounded-lg bg-red-50 border border-red-200 p-3 flex items-center gap-2">
        <WifiOff size={18} className="text-red-500" />
        <span className="text-sm text-red-600">Sem conexão com a internet</span>
      </div>
    </div>
  );
}