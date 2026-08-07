import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";
import path from "node:path";

const jsonDbPath = path.join(__dirname, "/../data/films.json");


const defaultFilms: Film[] = [ 
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description:
      "Un voleur spécialisé dans l'extraction de secrets à travers les rêves se voit confier une mission d'inception.",
    imageUrl:
      "https://image.tmdb.org/t/p/original/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
  },
  {
    id: 2,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget: 165,
    description:
      "Une équipe d'astronautes traverse un trou de ver afin de trouver une nouvelle planète habitable pour l'humanité.",
    imageUrl:
      "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 3,
    title: "The Matrix",
    director: "Lana Wachowski & Lilly Wachowski",
    duration: 136,
    budget: 63,
    description:
      "Un pirate informatique découvre que la réalité dans laquelle il vit est une simulation créée par des machines.",
    imageUrl:
      "https://image.tmdb.org/t/p/original/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
];

function readAllFilms(minDuration:number): Film[]{
    const films = parse(jsonDbPath, defaultFilms);
    if(!minDuration) return films;
    const minDurationNumber = Number(minDuration);
    const filteredFilms = films.filter((film) => film.duration >= minDurationNumber);
    return filteredFilms;
}

function readOneFilm(id:number): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find((film) => film.id === id);
    if(!film) return undefined;
    return film;
}

function createOneFilm(newFilm:NewFilm): Film | undefined {
    const films = parse(jsonDbPath,defaultFilms);
    const isExisting = films.find((film) => film.title === newFilm.title && film.director === newFilm.director);
    if(isExisting){
        return undefined;
    }

    const nextId = films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;


    const createdFilm = {
        id:nextId,
        ...newFilm,
    };

    films.push(createdFilm);
    serialize(jsonDbPath, films);
    return createdFilm;
}

function deleteOneFilm(id:number): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const index = films.findIndex((film) => film.id === id);
    if(index === -1) return undefined;
    const deletedFilm = films.splice(index, 1);
    serialize(jsonDbPath, films);
    return deletedFilm[0];
}

function updateOneFilm(id:number, newFilm: Partial<NewFilm>): Film | undefined {
    const films = parse(jsonDbPath, defaultFilms);
    const film = films.find((film) => film.id === id);
    if(!film) return undefined;

    if(newFilm.title){
        film.title = newFilm.title!;
    }
    if(newFilm.director){
        film.director= newFilm.director!;
    }

    if(newFilm.duration){
        film.duration = newFilm.duration!;
    }

    if(newFilm.budget){
        film.budget = newFilm.budget!;
    }  

    if(newFilm.description){
        film.description = newFilm.description!;
    }  

    if(newFilm.imageUrl){
        film.imageUrl = newFilm.imageUrl!;
    }

    serialize(jsonDbPath, films);
    return film;
}

function replaceOneFilm(id:number, newFilm:NewFilm): Film {
    const films = parse(jsonDbPath,defaultFilms);
    const index = films.findIndex((film) => film.id === id);
    
    const film: Film = {
        id,
        ...newFilm,
    };

    if(index=== -1){
        films.push(film);
    }else{
        films[index] = film;
    }
    serialize(jsonDbPath,films);
    return film;

}
export {readAllFilms, readOneFilm, createOneFilm, deleteOneFilm, updateOneFilm, replaceOneFilm};