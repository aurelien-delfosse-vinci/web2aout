interface Movie {
  id:number;
  title: string;
  director:string;
  duration: number;
  imageUrl?:string;
  description?:string;
  budget?:number;
}

type NewMovie = Omit<Movie, "id">;

interface MovieContext{
  movies: Movie[],
  setMovies: (movies: Movie[]) => void;
  addMovie: (newMovie:NewMovie) => Promise<void>;
  deleteMovie: (id:number) => Promise<void>;
  registerUser: (newUser: User) => Promise<void>;
  loginUser: (user:User) => Promise<void>;
  authenticatedUser: MaybeAuthenticatedUser;
  updateMovie: (id: number, newMovie: NewMovie) => Promise<void>;
}

interface User {
  username:string;
  password:string;
}

interface AuthenticatedUser {
  username:string;
  token:string;
}

type MaybeAuthenticatedUser = AuthenticatedUser | undefined;

export type {Movie, NewMovie, MovieContext, User, AuthenticatedUser, MaybeAuthenticatedUser};

