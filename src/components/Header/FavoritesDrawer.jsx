import React from "react";
import { FaTrashAlt, FaTimes, FaShoppingCart } from "react-icons/fa";

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  removeFavorite,
  clearFavorites,
  addToCart,
}) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="absolute inset-0" onClick={onClose}></div>
      <div
        className={`absolute top-0 right-0 w-80 bg-white h-full shadow-lg transform transition-transform duration-300 ease-out flex flex-col
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h2 className="font-semibold text-gray-700">Meus Favoritos</h2>
          <button
            onClick={clearFavorites}
            className="text-sm text-blue-500 hover:underline"
          >
            Esvaziar
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <div
                key={fav.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={fav.image}
                    alt={fav.name}
                    className="w-10 h-10 bg-gray-200 rounded"
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-700">{fav.name}</p>
                    <p className="text-gray-500 text-xs">
                      R$ {fav.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(fav)}
                    title="Adicionar ao carrinho"
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaShoppingCart size={14} />
                  </button>
                  <button
                    onClick={() => removeFavorite(fav.id)}
                    title="Remover dos favoritos"
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FaTrashAlt size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-10 text-sm">
              Seus favoritos estão vazios.
            </p>
          )}
        </div>

        <div className="border-t px-5 py-4">
          <button
            onClick={() => {
              favorites.forEach((fav) => addToCart(fav));
              onClose();
            }}
            className="w-full bg-[#6a5cff] hover:bg-[#5a4de1] text-white py-2 rounded-md font-semibold transition flex items-center justify-center gap-2"
          >
            <FaShoppingCart />
            Adicionar todos ao carrinho
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
