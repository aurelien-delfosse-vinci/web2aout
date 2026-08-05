import { Link, useOutletContext } from "react-router-dom";
import type { MovieContext } from "../../types";

const HomePage = () => {
  const { movies }: MovieContext = useOutletContext();
  return (
    <div>
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movies/${movie.id}`}
          style={{ display: "block" }}
        >
          {movie.title}
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
