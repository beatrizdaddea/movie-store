import Header from "../components/Header/Header";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <section className="flex-1">
        <MovieList />
      </section>
    </div>
  );
}
