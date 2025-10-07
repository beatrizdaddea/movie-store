import MovieCard from "./MovieCard";

const movies = [
  {
    id: 1,
    title: "Nome do Filme",
    date: "7 de Janeiro, 2019",
    rating: 7,
    genre: "Gênero",
    price: "79,99",
  },
  {
    id: 2,
    title: "Nome do Filme",
    date: "7 de Janeiro, 2019",
    rating: 7,
    genre: "Gênero",
    price: "79,99",
  },
  {
    id: 3,
    title: "Nome do Filme",
    date: "7 de Janeiro, 2019",
    rating: 7,
    genre: "Gênero",
    price: "79,99",
  },
  {
    id: 4,
    title: "Nome do Filme",
    date: "7 de Janeiro, 2019",
    rating: 7,
    genre: "Gênero",
    price: "79,99",
  },
  {
    id: 5,
    title: "Nome do Filme",
    date: "7 de Janeiro, 2019",
    rating: 7,
    genre: "Gênero",
    price: "79,99",
  },
  {
    id: 6,
    title: "Nome do Filme",
    date: "7 de Janeiro, 2019",
    rating: 7,
    genre: "Gênero",
    price: "79,99",
  },
  {
    id: 7,
    title: "Nome do Filme",
    date: "7 de Janeiro, 2019",
    rating: 7,
    genre: "Gênero",
    price: "79,99",
  },
  {
    id: 8,
    title: "Nome do Filme",
    date: "7 de Janeiro, 2019",
    rating: 7,
    genre: "Gênero",
    price: "79,99",
  },
];

export default function MovieList() {
  return (
    <main className="px-8 py-10 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}
