import React from "react";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  total,
  removeItem,
  clearCart,
  onCheckout,
}) {
  const handleCheckout = () => {
    onClose();
    onCheckout(cart);
  };

  const handleClearCart = (e) => {
    e.stopPropagation();
    clearCart();
    toast("Carrinho esvaziado", { icon: "🗑️" });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      <div
        className={`absolute top-0 right-0 w-80 bg-white h-full shadow-lg transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b px-5 py-3 relative">
          <h2 className="font-semibold text-gray-700">Meu Carrinho</h2>
          <div className="flex items-center gap-4">
            {cart.length > 0 && (
              <button
                onClick={handleClearCart}
                className="text-sm text-blue-500 hover:underline"
              >
                Esvaziar
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <FaTimes size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-10 h-10 bg-gray-200 rounded object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/60?text=Imagem";
                    }}
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-700">{item.title}</p>
                    <p className="text-gray-500 text-xs">
                      {item.qty}x R$ {item.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600 text-xs font-medium">
                      Subtotal: R$ {(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    removeItem(item.id);
                    toast.success("Item removido do carrinho 🗑️");
                  }}
                  title="Remover do carrinho"
                  className="text-gray-400 hover:text-red-500 p-1"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10 text-sm">
              Seu carrinho está vazio.
            </p>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t px-5 py-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium">Total:</span>
              <span className="font-bold text-gray-900 text-lg">
                R$ {total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-[#6a5cff] hover:bg-[#5a4de1] text-white py-2 rounded-md font-semibold transition"
            >
              Finalizar compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
