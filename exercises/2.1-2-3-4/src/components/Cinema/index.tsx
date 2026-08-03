interface CinemaProps {
  name:string;
  movies: Movie[];
};

type Movie = {
    title:string;
    director:string;
};

const Cinema = (props:CinemaProps) => {
  return (
    <div>
        <h2>{props.name}</h2>
        <table>
            <thead>
                <tr>
                    <th>Film</th>
                    <th>Director</th>
                </tr>
            </thead>
            <tbody>
                {props.movies.map((movie) => (
                    <tr key={movie.title}>
                        <td>{movie.title}</td>
                        <td>{movie.director}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
  );
};

export default Cinema;