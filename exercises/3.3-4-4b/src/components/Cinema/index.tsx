import MovieItem from "./MovieItem";

interface CinemaProps {
  name:string;
  movies: Movie[];
};

type Movie = {
    title:string;
    director:string;
    description:string;
};

const Cinema = ({name, movies}:CinemaProps) => {
  return (
    <div>
        <h2>{name}</h2>
        <table>
            <thead>
                <tr>
                    <th>Film</th>
                    <th>Director</th>
                </tr>
            </thead>

            <tbody>
                {movies.map((movie) => (
                    <MovieItem key={movie.title}
                        title={movie.title}
                        director={movie.director}
                        description={movie.description}
                        />
                ))}
            </tbody>
        </table>
      </div>
  );
};

export default Cinema;