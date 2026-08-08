import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
import type { AuthenticatedUser, MaybeAuthenticatedUser, Movie, MovieContext, NewMovie, User } from "../../types";
import Header from "../Header";
import PageTitle from "../PageTitle";
import Footer from "../Footer";
import { clearAuthenticatedUser, getAuthenticatedUser, storeAuthenticatedUser } from "../../utils/session";

type Theme = "light" | "dark";


const App = () => {
  const pageTitle = "Informations sur les films dans les cinémas";
  const image =
  "https://unsplash.com/photos/a-lamb-logo-on-a-black-background-ze5wHM9kplc";
  
  const [authenticatedUser, setAuthenticatedUser] = useState<MaybeAuthenticatedUser>(undefined);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    if(savedTheme === "light"){
      return "light";
    }

    return "dark";
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);
  };

  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    fetchMovies();
    const authenticatedUser = getAuthenticatedUser();
    if(authenticatedUser) setAuthenticatedUser(authenticatedUser);
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
      if(!authenticatedUser) throw new Error("You must be authenticated to add a movie");
      const options = {
        method: "POST",
        body: JSON.stringify(newMovie),
        headers: {
          "Content-type":"application/json",
          Authorization: authenticatedUser.token,
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

  const deleteMovie = async (id: number) => {
    try{
      if(!authenticatedUser) throw new Error("you must be authenticated to remove a movie");
      const options = {
        method: "DELETE",
        headers: {
          Authorization: authenticatedUser?.token}
      };
      const response = await fetch(`/api/movies/${id}`, options);

      if(!response.ok) throw new Error(`Fetch error: ${response.status}: ${response.statusText}`);

      await fetchMovies();

    }catch(err){
      console.error("deleteMovie::error : ", err);
      throw err;
    }
  }


  const registerUser = async (newUser:User) =>{
    try{
      const options = {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-type": 'application/json'
        },
      };

      const response = await fetch("/api/auths/register", options);
      if(!response.ok) throw new Error(`fetch error: ${response.status} : ${response.statusText}`);

      const createdUser: AuthenticatedUser = await response.json();

      setAuthenticatedUser(createdUser);
      storeAuthenticatedUser(createdUser);
      console.log("createdUser: ", createdUser);
    }catch(err){
      console.error("registerUser::error: ", err);
      throw err;
    }
  };

  const loginUser = async (user: User) => {
    try{
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options);
      if(!response.ok) throw new Error(`fetch error: ${response.status} : ${response.statusText}`);

      const authenticatedUser: AuthenticatedUser = await response.json();
      console.log("authenticatedUser : ", authenticatedUser);

      setAuthenticatedUser(authenticatedUser);
      storeAuthenticatedUser(authenticatedUser);
    }catch(err){
      console.error("loginUser::error: ", err);
      throw err;
    }
  }

  const clearUser = () => {
    clearAuthenticatedUser();
    setAuthenticatedUser(undefined);
  }

  const movieContext: MovieContext = {
    addMovie,
    deleteMovie,
    movies,
    setMovies,
    registerUser,
    loginUser,
    authenticatedUser,
  };

  return (
    <div>
      <Header image={image} theme={theme} onThemeChange={toggleTheme}>
        <PageTitle title={pageTitle} />
      </Header>
      <div>
        <NavBar authenticatedUser={authenticatedUser} clearUser={clearUser}/>
        <Outlet context={movieContext} />
      </div>
      <Footer image={image} theme={theme}>
        <p>© 2026 - Application Cinéma</p>
      </Footer>
    </div>
  );
};

export default App;
