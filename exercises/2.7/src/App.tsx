import { useState, type SyntheticEvent } from "react";

import "./App.css";
import type Movie from "./types";

const defaultMovies: Movie[] = [
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    budget: 165,
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    budget: 160,
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    budget: 185,
  },
  {
    title: "Parasite",
    director: "Bong Joon-ho",
    duration: 132,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
    budget: 11,
  },
  {
    title: "Gladiator",
    director: "Ridley Scott",
    duration: 155,
    imageUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    budget: 103,
  },
];

interface MovieMenuProps {
  movies: Movie[];
}

const MovieMenu = ({ movies }: MovieMenuProps) => {
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
          <tr key={movie.title}>
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
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function App() {
  const [movies, setMovies] = useState(defaultMovies);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [duration, setDuration] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(0);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const movie: Movie = {
      title: title,
      director: director,
      duration: duration,
    };
    if (image) movie.imageUrl = image;
    if (description) movie.description = description;
    if (budget > 0) movie.budget = budget as number;

    setMovies([...movies, movie]);
  };
  const handleTitleChange = (e: SyntheticEvent) => {
    const titleInput = e.target as HTMLInputElement;
    setTitle(titleInput.value);
  };
  const handleDirectorChange = (e: SyntheticEvent) => {
    const directorInput = e.target as HTMLInputElement;
    setDirector(directorInput.value);
  };
  const handleDurationChange = (e: SyntheticEvent) => {
    const durationInput = e.target as HTMLInputElement;
    setDuration(durationInput.valueAsNumber);
  };
  const handleImageChange = (e: SyntheticEvent) => {
    const imageInput = e.target as HTMLInputElement;
    setImage(imageInput.value);
  };
  const handleDescChange = (e: SyntheticEvent) => {
    const descInput = e.target as HTMLInputElement;
    setDescription(descInput.value);
  };
  const handleBudgetChange = (e: SyntheticEvent) => {
    const budgetInput = e.target as HTMLInputElement;
    setBudget(budgetInput.valueAsNumber);
  };

  return (
    <>
      <div>
        <h1>Mes films preferes</h1>
        <MovieMenu movies={movies} />
        <div
          style={{
            backgroundColor: "#303030",
            border: "1px solid #444",
            borderRadius: "10px",
            padding: "20px",
            width: "fit-content",
            margin: "30px auto",
          }}
        >
          <h3>Ajouter un film</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleTitleChange}
            />
            <br />
            <label htmlFor="director">Director</label>
            <input
              type="text"
              id="director"
              name="director"
              onChange={handleDirectorChange}
            />
            <br />
            <label htmlFor="duration">Duration</label>
            <input
              type="number"
              id="duration"
              name="duration"
              onChange={handleDurationChange}
            />
            <br />
            <label htmlFor="image">Image URL</label>
            <input
              type="text"
              id="image"
              name="image"
              onChange={handleImageChange}
            />
            <br />
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              onChange={handleDescChange}
            />
            <br />
            <label htmlFor="budget">Budget</label>
            <input
              type="number"
              id="budget"
              name="budget"
              onChange={handleBudgetChange}
            />
            <br />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
