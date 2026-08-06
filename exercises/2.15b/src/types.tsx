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
}

export type {Movie, NewMovie, MovieContext};

