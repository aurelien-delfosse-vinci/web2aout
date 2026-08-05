import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import type { Movie, MovieContext, NewMovie } from "../../types";
import Header from "../Header";
import PageTitle from "../PageTitle";
import Footer from "../Footer";

const defaultMovies: Movie[] = [
  {
    id: 1,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    budget: 165,
  },
  {
    id: 2,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    budget: 160,
  },
  {
    id: 3,
    title: "The Dark Knight",
    director: "Christopher Nolan",
    duration: 152,
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    budget: 185,
  },
  {
    id: 4,
    title: "Parasite",
    director: "Bong Joon-ho",
    duration: 132,
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png",
    budget: 11,
  },
  {
    id: 5,
    title: "Gladiator",
    director: "Ridley Scott",
    duration: 155,
    imageUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    budget: 103,
  },
];

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";
  const image =
    "https://unsplash.com/photos/a-lamb-logo-on-a-black-background-ze5wHM9kplc";

  const [movies, setMovies] = useState(defaultMovies);

  const addMovie = (newMovie: NewMovie) => {
    const movie: Movie = {
      id: nextMovieId(movies),
      title: newMovie.title,
      director: newMovie.director,
      duration: newMovie.duration,
    };
    if (newMovie.imageUrl) movie.imageUrl = newMovie.imageUrl;
    if (newMovie.description) movie.description = newMovie.description;
    if (Number(newMovie.budget) > 0) movie.budget = newMovie.budget as number;

    setMovies([...movies, movie]);
  };

  const movieContext: MovieContext = {
    addMovie,
    movies,
    setMovies,
  };

  return (
    <div>
      <Header image={image}>
        <PageTitle title={pageTitle} />
      </Header>
      <div>
        <NavBar />
        <Outlet context={movieContext} />
      </div>
      <Footer image={image}>
        <p>© 2026 - Application Cinéma</p>
      </Footer>
    </div>
  );
};

const nextMovieId = (movies: Movie[]) => {
  const ids = movies.map((movie) => movie.id);
  return Math.max(...ids) + 1;
};

export default App;
