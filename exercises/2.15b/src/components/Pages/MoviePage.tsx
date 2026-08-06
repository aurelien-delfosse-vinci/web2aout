import { useMatch, useNavigate, useOutletContext } from "react-router-dom";
import type { MovieContext } from "../../types";

const MoviePage = () => {
  const navigate = useNavigate();
  const { movies }: MovieContext = useOutletContext();
  const match = useMatch("/movies/:movieId");
  const movieId = match?.params.movieId;
  if (!movieId) return <p>Movie Not found</p>;
  const movie = movies.find((movie) => movie.id.toString() === movieId);
  if (!movie) return <p>Movie Not Found</p>;

  return (
    <div>
      <p>{movie.imageUrl && (
                <img src={movie.imageUrl} alt={movie.title} width={200} />
              )}</p>
      <h2>{movie.title}</h2>
      <p>{movie.director}</p>
      <p>{movie.duration} min</p>
      <p>{movie.description}</p>
      <p>{movie.budget} millions $</p>
      <br />
      <button onClick={() => navigate("/")}>Retour</button>
    </div>
  );
};
export default MoviePage;
