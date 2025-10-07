const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbService = {
  searchMovies: async (query, page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=pt-BR`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar filmes');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro na busca de filmes:', error);
      throw error;
    }
  },

  getPopularMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=pt-BR`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar filmes populares');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar filmes populares:', error);
      throw error;
    }
  },

  getMovieDetails: async (movieId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do filme');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar detalhes do filme:', error);
      throw error;
    }
  },

  getImageUrl: (path, size = 'w500') => {
    if (!path) {
      return 'https://via.placeholder.com/500x750/cccccc/969696?text=Sem+Imagem';
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },

  getGenres: async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=pt-BR`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar gêneros');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar gêneros:', error);
      throw error;
    }
  }
};