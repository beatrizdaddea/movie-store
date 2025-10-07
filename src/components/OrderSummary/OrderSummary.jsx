import React from "react";
import CartItem from "../CartItem/CartItem";

const OrderSummary = ({
  cart,
  total,
  onRemoveItem,
  onCheckout,
  isFormValid,
  onNavigateHome,
}) => {
  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Seu carrinho está vazio</p>
        <button
          onClick={onNavigateHome}
          className="mt-4 bg-[#6a5cff] hover:bg-[#584ae3] text-white py-2 px-4 rounded-md font-medium transition"
        >
          Voltar para a Loja
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mb-3 text-gray-600 font-semibold text-sm">
        <span>Imagem</span>
        <span>Nome</span>
        <span>Qtd</span>
        <span>Preço</span>
      </div>

      {cart.map((item) => (
        <CartItem key={item.id} item={item} onRemove={onRemoveItem} />
      ))}

      <div className="flex justify-between mt-6 text-lg font-semibold pt-4 border-t border-gray-200">
        <span>Total:</span>
        <span>R$ {total.toFixed(2)}</span>
      </div>

      <button
        onClick={onCheckout}
        disabled={!isFormValid}
        className={`w-full mt-6 text-white py-2.5 rounded-md font-medium transition ${
          isFormValid
            ? "bg-[#6a5cff] hover:bg-[#584ae3] cursor-pointer"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Finalizar Compra
      </button>
    </>
  );
};

export default OrderSummary;
