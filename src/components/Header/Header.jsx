import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartDrawer from "./CartDrawer";
import FavoritesDrawer from "./FavoritesDrawer";

export default function Header() {
  const [cartCount, setCartCount] = useState(2);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsFavOpen(false);
  };

  const toggleFav = () => {
    setIsFavOpen(!isFavOpen);
    setIsCartOpen(false);
  };

  // Dados de exemplo
  const cartItems = [
    {
      id: 1,
      name: "Nome do Filme",
      price: 9.99,
      qty: 1,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Nome do Filme",
      price: 9.99,
      qty: 1,
      image: "https://via.placeholder.com/60",
    },
  ];

  const favoriteItems = [
    {
      id: 1,
      name: "Filme Favorito 1",
      price: 12.99,
      image: "https://via.placeholder.com/60",
    },
    {
      id: 2,
      name: "Filme Favorito 2",
      price: 14.99,
      image: "https://via.placeholder.com/60",
    },
  ];

  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const removeFromCart = (id) => {
    setCartCount((prev) => prev - 1);
  };

  const clearCart = () => {
    setCartCount(0);
  };

  const removeFavorite = (id) => {
    console.log("Remover favorito:", id);
  };

  const clearFavorites = () => {
    console.log("Limpar favoritos");
  };

  const addToCart = (item) => {
    setCartCount((prev) => prev + 1);
    console.log("Adicionar ao carrinho:", item);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <header className="bg-[#d5f3f1] flex items-center justify-between px-4 py-2 shadow-sm w-full relative">
        <div className="text-white font-bold text-lg">LOGO</div>

        <div className="flex-1 mx-4 max-w-md relative">
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white text-gray-600"
          />
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
        </div>

        <div className="flex items-center space-x-4 text-white">
          <div className="relative">
            <FaHeart className="cursor-pointer text-lg" onClick={toggleFav} />
          </div>

          <div className="relative">
            <FaShoppingCart
              className="cursor-pointer text-lg"
              onClick={toggleCart}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-300 text-xs text-gray-800 font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cartItems}
        total={cartTotal}
        removeItem={removeFromCart}
        clearCart={clearCart}
        onCheckout={handleCheckout}
      />

      <FavoritesDrawer
        isOpen={isFavOpen}
        onClose={toggleFav}
        favorites={favoriteItems}
        removeFavorite={removeFavorite}
        clearFavorites={clearFavorites}
        addToCart={addToCart}
      />
    </>
  );
}
