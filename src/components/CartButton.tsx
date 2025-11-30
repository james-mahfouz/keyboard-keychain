"use client";

import { ShoppingCart } from 'lucide-react';
import { useCart } from './CartProvider';
import { useRouter } from 'next/navigation';

export const CartButton = () => {
  const { totalItems } = useCart();
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/cart')}
      className="relative pixel-button bg-[#cc0000] text-white px-4 py-2 flex items-center gap-2 hover:bg-[#aa0000] transition-colors"
    >
      <ShoppingCart className="w-5 h-5" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#ffff00] text-[#1a2744] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#1a2744] animate-pulse">
          {totalItems}
        </span>
      )}
    </button>
  );
};
