import { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import { tmdbService } from "../../services/MovieService";

export default function MovieList({
  onAddToCart,
  onAddToFavorites,
  onRemoveFromFavorites,
  favorites = [],
}) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const fetchPopularMovies = async (pageNum = 1) => {
    try {
      setLoading(true);
      const data = await tmdbService.getPopularMovies(pageNum);

      const moviesWithGenres = data.results.map((movie) => ({
        ...movie,
        genre_names: movie.genre_ids?.slice(0, 2) || [],
      }));

      if (pageNum === 1) {
        setMovies(moviesWithGenres);
      } else {
        setMovies((prev) => [...prev, ...moviesWithGenres]);
      }

      setError("");
    } catch (err) {
      setError("Erro ao carregar filmes. Tente novamente.");
      console.error("Erro ao buscar filmes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPopularMovies(nextPage);
  };

  if (error) {
    return (
      <main className="px-8 py-10 bg-white">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={() => fetchPopularMovies(1)}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Tentar Novamente
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 sm:px-8 py-10 bg-white">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Filmes Populares</h1>
        <p className="text-gray-600 mt-2">
          Descubra os filmes mais populares do momento
        </p>
      </div>

      {loading && movies.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-300 h-48 rounded-lg mb-3"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-3 rounded w-3/4"></div>
              <div className="bg-gray-300 h-6 rounded mt-3 w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
                onRemoveFromFavorites={onRemoveFromFavorites}
                favorites={favorites}
              />
            ))}
          </div>

          {/* Botão Carregar Mais */}
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Carregando..." : "Carregar Mais Filmes"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
