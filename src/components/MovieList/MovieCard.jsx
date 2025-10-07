import { FaStar, FaHeart, FaImage } from "react-icons/fa";

export default function MovieCard({ movie }) {
  return (
    <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-md transition">
      <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
        <FaHeart />
      </button>

      <div className="flex items-center justify-center bg-gray-300 h-36">
        {movie.image ? (
          <img src={movie.image} alt={movie.title} className="object-cover h-full w-full" />
        ) : (
          <FaImage className="text-gray-500 text-3xl" />
        )}
      </div>

      <div className="p-3 text-sm text-gray-700">
        <p className="text-gray-500 text-xs">{movie.date}</p>
        <h3 className="font-semibold text-gray-800">{movie.title}</h3>

        <div className="flex items-center gap-1 mt-1">
          <FaStar className="text-yellow-400 text-xs" />
          <span className="text-sm font-medium">{movie.rating}</span>
          <span className="text-xs text-gray-500">• {movie.genre}</span>
        </div>

        <p className="font-semibold mt-1">R$ {movie.price}</p>
      </div>

      <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm py-2">
        Adicionar
      </button>
    </div>
  );
}
