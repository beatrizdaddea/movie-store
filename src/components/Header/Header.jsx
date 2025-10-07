import { useState, useEffect } from "react";
import { FaSearch, FaHeart, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CartDrawer from "../ShoppingCart/ShoppingCart";
import FavoritesDrawer from "../FavoritesDrawer/FavoritesDrawer";
import { tmdbService } from "../../services/MovieService";

export default function Header({
  onAddToCart = () => {},
  cart: propCart = [],
  favorites: propFavorites = [],
  onRemoveFromCart = () => {},
  onClearCart = () => {},
  onAddToFavorites = () => {},
  onRemoveFromFavorites = () => {},
  onClearFavorites = () => {},
}) {
  const [localCart, setLocalCart] = useState([]);
  const [localFavorites, setLocalFavorites] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavOpen, setIsFavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const cart = propCart || localCart;
  const favorites = propFavorites || localFavorites;

  const handleRemoveFromCart = (id) => {
    if (onRemoveFromCart) {
      onRemoveFromCart(id);
    } else {
      setLocalCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  };

  const handleClearCart = () => {
    if (onClearCart) {
      onClearCart();
    } else {
      setLocalCart([]);
    }
  };

  const handleAddToFavorites = (movie) => {
    const fav = {
      id: movie.id,
      title: movie.title || movie.name,
      name: movie.name || movie.title,
      image: movie.image || tmdbService.getImageUrl(movie.poster_path, "w200"),
      rating: movie.vote_average || movie.rating,
      price: movie.price,
      releaseDate: movie.release_date || movie.releaseDate,
    };

    if (onAddToFavorites) {
      onAddToFavorites(fav);
    } else {
      setLocalFavorites((prev) => {
        const exists = prev.find((item) => item.id === fav.id);
        if (!exists) return [...prev, fav];
        return prev;
      });
    }
  };

  const handleRemoveFromFavorites = (id) => {
    if (onRemoveFromFavorites) {
      onRemoveFromFavorites(id);
    } else {
      setLocalFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.id !== id)
      );
    }
  };

  const handleClearFavorites = () => {
    if (onClearFavorites) {
      onClearFavorites();
    } else {
      setLocalFavorites([]);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setIsFavOpen(false);
    setIsSearchOpen(false);
  };

  const toggleFav = () => {
    setIsFavOpen(!isFavOpen);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const favoritesCount = favorites.length;

  const searchMovies = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await tmdbService.searchMovies(query);
      setSearchResults(data.results || []);
      setIsSearchOpen(true);
    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length > 2) {
        searchMovies(searchQuery);
      } else {
        setSearchResults([]);
        setIsSearchOpen(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
    setError("");
  };

  const handleAddMovieToCart = (movie) => {
    const movieItem = {
      id: movie.id,
      name: movie.title,
      price: 9.99,
      qty: 1,
      image: tmdbService.getImageUrl(movie.poster_path, "w200"),
      rating: movie.vote_average,
      releaseDate: movie.release_date,
    };

    if (onAddToCart) {
      onAddToCart(movieItem);
    } else {
      setLocalCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === movieItem.id);

        if (existingItem) {
          return prevCart.map((item) =>
            item.id === movieItem.id ? { ...item, qty: item.qty + 1 } : item
          );
        }

        return [...prevCart, movieItem];
      });
    }

    setIsCartOpen(true);
    clearSearch();
  };

  const handleAddFavoriteToCart = (fav) => {
    if (!fav) return;

    const cartItem = {
      id: fav.id,
      name: fav.name || fav.title || fav.title || "Filme",
      price: fav.price ?? 9.99,
      qty: 1,
      image:
        fav.image || tmdbService.getImageUrl(fav.poster_path || fav.poster_path, "w200") || "",
      rating: fav.rating ?? fav.vote_average,
      releaseDate: fav.releaseDate || fav.release_date,
      overview: fav.overview,
    };

    if (onAddToCart) {
      onAddToCart(cartItem);
    } else {
      setLocalCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === cartItem.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === cartItem.id ? { ...item, qty: item.qty + 1 } : item
          );
        }
        return [...prevCart, cartItem];
      });
    }

    setIsCartOpen(true);
  };

  const handleAddMovieToFavorites = (movie) => {
    const favoriteItem = {
      id: movie.id,
      name: movie.title,
      price: 9.99,
      image: tmdbService.getImageUrl(movie.poster_path, "w200"),
      rating: movie.vote_average,
      releaseDate: movie.release_date,
    };

    handleAddToFavorites(favoriteItem);
    clearSearch();
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setIsSearchOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <header className="bg-[#d5f3f1] flex items-center justify-between px-4 py-2 shadow-sm w-full relative">
        <div
          className="text-white font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          LOGO
        </div>

        <div className="flex-1 mx-4 max-w-md relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar filmes..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300 bg-white text-gray-600"
              onClick={(e) => e.stopPropagation()}
            />
            {searchQuery ? (
              <FaTimes
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm cursor-pointer hover:text-gray-700"
                onClick={clearSearch}
              />
            ) : (
              <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm" />
            )}
          </div>

          {/* Dropdown de resultados da pesquisa */}
          {isSearchOpen && (
            <div
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg mt-1 max-h-80 overflow-y-auto z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {loading && (
                <div className="p-3 text-center text-gray-500 text-sm">
                  Carregando...
                </div>
              )}

              {error && (
                <div className="p-3 text-center text-red-500 text-sm">
                  {error}
                </div>
              )}

              {!loading &&
                !error &&
                searchResults.length === 0 &&
                searchQuery.length > 2 && (
                  <div className="p-3 text-center text-gray-500 text-sm">
                    Nenhum filme encontrado
                  </div>
                )}

              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                >
                  <img
                    src={tmdbService.getImageUrl(movie.poster_path, "w92")}
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded mr-3 flex-shrink-0"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/92x138?text=Sem+Imagem";
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm truncate">
                      {movie.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                      <span className="mx-2">•</span>
                      <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 ml-2">
                    <button
                      className="px-2 py-1 bg-[#6a5cff] text-white text-xs rounded hover:bg-[#584ae3] transition whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddMovieToCart(movie);
                      }}
                    >
                      Carrinho
                    </button>
                    <button
                      className="px-2 py-1 bg-pink-500 text-white text-xs rounded hover:bg-pink-600 transition whitespace-nowrap"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddMovieToFavorites(movie);
                      }}
                    >
                      Favorito
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4 text-white">
          <div className="relative">
            <FaHeart
              className="cursor-pointer text-lg hover:text-gray-200 transition"
              onClick={toggleFav}
            />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-xs text-white font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>

          <div className="relative">
            <FaShoppingCart
              className="cursor-pointer text-lg hover:text-gray-200 transition"
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
        cart={cart}
        total={cartTotal}
        removeItem={handleRemoveFromCart}
        clearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      <FavoritesDrawer
        isOpen={isFavOpen}
        onClose={toggleFav}
        favorites={favorites}
        removeFavorite={handleRemoveFromFavorites}
        clearFavorites={handleClearFavorites}
        addToCart={handleAddFavoriteToCart}
      />
    </>
  );
}
