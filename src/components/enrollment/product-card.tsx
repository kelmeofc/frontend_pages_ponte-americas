import React from 'react';

interface ProductCardProps {
  title: string;
  description?: string;
  originalPrice: string;
  currentPrice: string;
  discount: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  title, 
  description, 
  originalPrice, 
  currentPrice, 
  discount 
}) => (
  <div className="w-full p-4 bg-white/0 rounded-lg shadow-sm outline-2 outline-blue-500 flex flex-col gap-3">
    <label className="flex items-start gap-3">
      <input type="checkbox" defaultChecked className="size-4 mt-1" />
      <div className="flex-1">
        <div className="text-gray-800 text-sm font-medium">{title}</div>
        {description && <div className="text-zinc-600 text-xs italic mt-1">"{description}"</div>}
      </div>
    </label>

    <div className="p-3 bg-zinc-200 rounded-md border-l-4 border-emerald-700 flex items-center justify-between">
      <div>
        <div className="text-neutral-400 text-xs line-through">{originalPrice}</div>
        <div className="text-zinc-600 text-sm">{currentPrice}</div>
      </div>
      <div className="bg-emerald-700 text-white text-xs px-2 py-1 rounded-full">{discount}</div>
    </div>
  </div>
);
