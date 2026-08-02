import {Router} from "express";
import { Film, NewFilm } from "../types";


const films: Film[] = [ 
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

const router = Router();

let counter = 0;
router.get('/', (req, res) => {
  counter++;
  console.log(req.method + " COUNTER : " + counter);
  if(!req.query["duration-min"]){
    return res.json(films);
  }
  const minDuration = Number(req.query["duration-min"]);
  const filteredFilms = films.filter((film) => {
    return film.duration >= minDuration;
  });
  return res.json(filteredFilms);
});

router.get("/:id",(req,res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if(!film) return res.sendStatus(404);
  return res.json(film);
});

router.post("/",(req,res) => {
  const body: unknown = req.body;
  if(!body ||
     typeof(body) !== "object" || 
     !("title" in body) || 
     !("director" in body) || 
     !("duration" in body) || 
     typeof body.title !== "string" ||
     typeof body.director !== "string" || 
     typeof body.duration !== "number" ||
     !body.title.trim() || 
     !body.director.trim() || 
     body.duration <= 0){
      return res.sendStatus(400);
  }
  if("budget" in body && body.budget !== undefined && (typeof body.budget !== "number" || body.budget <= 0 ))
    { 
      return res.sendStatus(400);
  }
  if("description" in body && body.description !== undefined && typeof body.description !== "string"){
    return res.sendStatus(400);
  }
  if("imageUrl" in body && body.imageUrl !== undefined && typeof body.imageUrl !== "string"){
    return res.sendStatus(400);
  }

  const {title, director, duration, budget, description, imageUrl} = body as NewFilm;

  const isExisting = films.find((film) => film.title === title && film.director === director);

  if(isExisting) return res.sendStatus(409);
  
  const nextId = films.reduce((maxID, film) => (film.id > maxID ? film.id : maxID), 0) + 1;

  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl
  };

  films.push(newFilm);
  return res.json(newFilm);
});


export default router;