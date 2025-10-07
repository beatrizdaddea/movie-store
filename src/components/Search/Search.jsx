import React, { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { tmdbService } from "../../services/MovieService";

const Search = ({ onAddToCart }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await tmdbService.searchMovies(searchQuery);
      setResults(data.results || []);
    } catch (err) {
      setError("Erro ao buscar filmes. Tente novamente.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      handleSearch(value);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  const handleAddToCart = (movie) => {
    const movieItem = {
      ...movie,
      image: tmdbService.getImageUrl(movie.poster_path, "w200"),
    };

    onAddToCart(movieItem);
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setError("");
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar filmes..."
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-96 overflow-y-auto z-50">
          {loading && (
            <div className="p-4 text-center text-gray-500">Carregando...</div>
          )}

          {error && <div className="p-4 text-center text-red-500">{error}</div>}

          {!loading && !error && results.length === 0 && query.length > 2 && (
            <div className="p-4 text-center text-gray-500">
              Nenhum filme encontrado
            </div>
          )}

          {results.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleAddToCart(movie)}
            >
              <img
                src={tmdbService.getImageUrl(movie.poster_path, "w92")}
                alt={movie.title}
                className="w-12 h-16 object-cover rounded mr-3"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/92x138?text=Sem+Imagem";
                }}
              />

              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{movie.title}</h3>
                <div className="flex items-center text-sm text-gray-600">
                  <span>{movie.release_date?.split("-")[0] || "N/A"}</span>
                  <span className="mx-2">•</span>
                  <span>⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
                </div>
              </div>

              <button className="ml-2 px-3 py-1 bg-[#6a5cff] text-white text-sm rounded hover:bg-[#584ae3] transition">
                Adicionar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
