import React from "react";

import { Trash2 } from "lucide-react";

export const CartItem = ({ item, onRemove }) => {
  return (
    <div className="grid grid-cols-4 gap-4 items-center border-b border-gray-200 py-3 text-sm">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 rounded-md bg-gray-200 object-cover"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/60?text=Imagem";
        }}
      />
      <span className="font-medium">{item.name}</span>
      <span>{item.qty}</span>
      <div className="flex items-center justify-between">
        <span>R$ {item.price.toFixed(2)}</span>
        <Trash2
          className="text-gray-400 hover:text-red-500 cursor-pointer w-4 h-4 ml-2"
          onClick={() => onRemove(item.id)}
        />
      </div>
    </div>
  );
};

export default CartItem;