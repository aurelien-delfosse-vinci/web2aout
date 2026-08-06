import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import type { Movie, MovieContext, NewMovie } from "../../types";
import Header from "../Header";
import PageTitle from "../PageTitle";
import Footer from "../Footer";

const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";
  const image =
    "https://unsplash.com/photos/a-lamb-logo-on-a-black-background-ze5wHM9kplc";

  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    fetchMovies();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = async () => {
    try{
      const movies = await getAllMovies();
      console.log(movies);
      setMovies(movies);
    }catch(err){
      console.error("HomePage::error: ",err);
    }
  };

  async function getAllMovies() {
    try{
      const response = await fetch("/api/movies");

      if(!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);
      const pizzas = await response.json();

      return pizzas;
    }catch(err){
      console.error("getAllMovies::error: ", err);
      throw err;
    }
  };
  const addMovie = async (newMovie: NewMovie) => {
    try{
      const options = {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
          "Content-type":"application/json",
        },
      };

      const response = await fetch("/api/movies", options);
      if(!response.ok) throw new Error(`fetch error: ${response.status}: ${response.statusText}`);

      const createdMovie = await response.json();

      setMovies([...movies, createdMovie]);
    }catch(err){
      console.error("AddMoviePage::error : ", err)
      throw err;
    }
    
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

export default App;
