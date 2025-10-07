import { FaStar, FaHeart, FaImage } from "react-icons/fa";
import { tmdbService } from "../../services/MovieService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function MovieCard({
  movie,
  onAddToCart,
  onAddToFavorites,
  onRemoveFromFavorites,
  favorites = [],
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const isFav = favorites.some((fav) => fav.id === movie.id);
    setIsFavorite(isFav);
  }, [favorites, movie.id]);

  const formatDate = (dateString) => {
    if (!dateString) return "Data não informada";
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const generatePrice = (movieId) => {
    const prices = [9.99, 12.99, 14.99, 16.99, 19.99, 24.99, 29.99];
    return prices[movieId % prices.length];
  };

  const handleAddToCart = () => {
    const movieItem = {
      id: movie.id,
      name: movie.title,
      price: generatePrice(movie.id),
      qty: 1,
      image: tmdbService.getImageUrl(movie.poster_path, "w300"),
      rating: movie.vote_average,
      releaseDate: movie.release_date,
      overview: movie.overview,
      genre: movie.genre_names?.[0] || "Filme",
    };
    if (onAddToCart) {
      onAddToCart(movieItem);
      toast.success(`${movie.title} adicionado ao carrinho 🛒`);
    }
  };

  const handleToggleFavorite = () => {
    const favoriteItem = {
      id: movie.id,
      name: movie.title,
      price: generatePrice(movie.id),
      image: tmdbService.getImageUrl(movie.poster_path, "w300"),
      rating: movie.vote_average,
      releaseDate: movie.release_date,
    };
    if (isFavorite) {
      if (onRemoveFromFavorites) onRemoveFromFavorites(movie.id);
      toast(`${movie.title} removido dos favoritos 💔`);
      setIsFavorite(false);
    } else {
      if (onAddToFavorites) onAddToFavorites(favoriteItem);
      toast.success(`${movie.title} adicionado aos favoritos ❤️`);
      setIsFavorite(true);
    }
  };

  const handleImageError = () => setImageError(true);

  const price = generatePrice(movie.id);
  const imageUrl = tmdbService.getImageUrl(movie.poster_path, "w300");

  return (
    <div className="relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 border border-gray-100">
      <button
        className={`absolute top-2 right-2 z-10 p-2 rounded-full transition ${
          isFavorite
            ? "text-red-500 bg-white shadow"
            : "text-gray-400 bg-white/80 hover:text-red-500"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggleFavorite();
        }}
      >
        <FaHeart className="text-sm" />
      </button>

      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {movie.poster_path && !imageError ? (
          <img
            src={imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-300 text-gray-500">
            <FaImage className="text-3xl mb-2" />
            <span className="text-xs text-center px-2">
              Imagem não disponível
            </span>
          </div>
        )}

        {movie.vote_average > 0 && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <FaStar className="text-yellow-400" />
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-gray-500 text-xs mb-1">
          {formatDate(movie.release_date)}
        </p>
        <h3 className="font-semibold text-gray-800 text-sm leading-tight mb-2 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 capitalize">
            {movie.genre_names?.[0] || "Filme"}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <p className="font-bold text-indigo-600 text-lg">
            R$ {price.toFixed(2).replace(".", ",")}
          </p>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2 px-4 rounded transition"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}
