import React from "react";
import { FaTrashAlt, FaTimes, FaShoppingCart } from "react-icons/fa";
import toast from "react-hot-toast";

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favorites,
  removeFavorite,
  clearFavorites,
  addToCart,
}) {
  const handleRemoveFavorite = (id) => {
    removeFavorite(id);
  };

  const handleClearFavorites = () => {
    clearFavorites();
  };

  const handleAddToCart = (fav) => {
    addToCart(fav);
    if (removeFavorite) removeFavorite(fav.id);
    const title = fav.name || fav.title || "Filme";
    toast.success(`${title} adicionado ao carrinho!`);
  };

  const handleAddAllToCart = () => {
    if (favorites.length === 0) return;
    favorites.forEach((fav) => {
      addToCart(fav);
    });
    if (clearFavorites) clearFavorites();
    const msg =
      favorites.length === 1
        ? `${favorites.length} filme adicionado ao carrinho`
        : `${favorites.length} filmes adicionados ao carrinho`;
    toast.success(msg);
    onClose();
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
          <h2 className="font-semibold text-gray-700">Meus Favoritos</h2>
          <div className="flex items-center gap-4">
            {favorites.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearFavorites();
                  toast("Favoritos esvaziados", { icon: "🗑️" });
                }}
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
                    className="w-10 h-10 bg-gray-200 rounded object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/60?text=Imagem";
                    }}
                  />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-700">{fav.name}</p>
                    <p className="text-gray-500 text-xs">
                      ⭐ {fav.rating?.toFixed(1) || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(fav);
                    }}
                    title="Adicionar ao carrinho"
                    className="text-green-500 hover:text-green-700 p-1"
                  >
                    <FaShoppingCart size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFavorite(fav.id);
                      toast("Removido dos favoritos", { icon: "❌" });
                    }}
                    title="Remover dos favoritos"
                    className="text-gray-400 hover:text-red-500 p-1"
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

        {favorites.length > 0 && (
          <div className="border-t px-5 py-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddAllToCart();
              }}
              className="w-full bg-[#6a5cff] hover:bg-[#5a4de1] text-white py-2 rounded-md font-semibold transition flex items-center justify-center gap-2"
            >
              <FaShoppingCart />
              Adicionar todos ao carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
