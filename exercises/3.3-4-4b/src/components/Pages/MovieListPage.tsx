
import { useNavigate, useOutletContext } from "react-router-dom";
import type { Movie, MovieContext } from "../../types";


interface MovieMenuProps {
  movies: Movie[];
}

const MovieMenu = ({ movies }: MovieMenuProps) => {
  const {deleteMovie, authenticatedUser}: MovieContext = useOutletContext();
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Duration</th>
          <th>Description</th>
          <th>Budget</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie.id}>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            <td>{movie.duration} min</td>

            <td>{movie.description}</td>
            <td>{movie.budget}</td>
            <td>
              {movie.imageUrl && (
                <img src={movie.imageUrl} alt={movie.title} width={100} />
              )}
            </td>
            {authenticatedUser && (<button onClick={() => deleteMovie(movie.id)}>Supprimer</button>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const MovieListPage = () => {
  
  const{movies, authenticatedUser}: MovieContext = useOutletContext();
  const navigate = useNavigate();
  return (
    <>
      <div>
        <h1>Mes films preferes</h1>
        <MovieMenu movies={movies} />
        {authenticatedUser && (<button onClick={() => navigate('/addMoviePage')}>Ajouter un film</button>
      )}
      </div>
    </>
  );
} 
export default MovieListPage;