import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import MovieList from "../components/MovieList/MovieList";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("movieCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("movieCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleAddToCart = (movieItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === movieItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === movieItem.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...movieItem, qty: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("movieCart");
  };

  const handleCheckout = () => {
    navigate("/checkout", { state: { cart } });
  };

  const handleAddToFavorites = (favoriteItem) => {
    setFavorites((prevFavorites) => {
      const exists = prevFavorites.find((item) => item.id === favoriteItem.id);
      if (!exists) return [...prevFavorites, favoriteItem];
      return prevFavorites;
    });
  };

  const handleRemoveFromFavorites = (itemId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== itemId)
    );
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem("favorites");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        favorites={favorites}
        onAddToFavorites={handleAddToFavorites}
        onRemoveFromFavorites={handleRemoveFromFavorites}
        onClearFavorites={handleClearFavorites}
        onCheckout={handleCheckout}
      />

      <section className="flex-1">
        <MovieList
          onAddToCart={handleAddToCart}
          onAddToFavorites={handleAddToFavorites}
          onRemoveFromFavorites={handleRemoveFromFavorites}
          favorites={favorites}
        />
      </section>
    </div>
  );
}
