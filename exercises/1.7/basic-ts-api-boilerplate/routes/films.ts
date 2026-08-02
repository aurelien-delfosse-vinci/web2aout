import {Router} from "express";
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

const router = Router();

router.get('/', (req, res) => {
  const films = parse(jsonDbPath, defaultFilms);
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
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);
  if(!film) return res.sendStatus(404);
  return res.json(film);
});

router.post("/",(req,res) => {
  const films = parse(jsonDbPath, defaultFilms);
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
  serialize(jsonDbPath, films);
  return res.json(newFilm);
});

router.delete("/:id", (req,res) => {
  const films = parse(jsonDbPath, defaultFilms);
  const id = Number(req.params.id);
  const index = films.findIndex((film) => film.id === id);
  if(index ===-1) return res.sendStatus(404);

  const deletedElements = films.splice(index, 1);
  serialize(jsonDbPath, films);
  return res.json(deletedElements[0]);
});

router.patch("/:id", (req,res) => {
  const films = parse(jsonDbPath, defaultFilms);
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);
  if(!film) return res.sendStatus(404);

  const body: unknown = req.body;

  if(!body || 
    typeof body !== "object" || 
    ("title" in body && 
      (typeof body.title !== "string" || !body.title.trim())) ||
    ("director" in body && 
      (typeof body.director !== "string" || !body.director.trim())) ||
    ("duration" in body && 
      (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("budget" in body && 
      (typeof body.budget !== "number" || body.budget <= 0)) || 
    ("description" in body &&
      (typeof body.description !== "string" || !body.description.trim())) ||
    ("imageUrl" in body &&
      (typeof body.imageUrl !== "string" || !body.imageUrl.trim()))
  ) {
    return res.sendStatus(400);
  }

  const {title, director, duration, budget, description, imageUrl}: Partial<NewFilm> = body;

  if(title){
    film.title = title;
  }
  if(director){
    film.director = director;
  }
  if(duration){
    film.duration = duration;
  }
  if(budget){
    film.budget = budget;
  }
  if(description){
    film.description = description;
  }
  if(imageUrl){
    film.imageUrl = imageUrl;
  }

  serialize(jsonDbPath, films);
  return res.json(film);
});


router.put("/:id", (req, res) => {
  const films = parse(jsonDbPath, defaultFilms);
  const id = Number(req.params.id);
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

  const newFilm: Film = {id, ...body as NewFilm};
  const index = films.findIndex((film) => film.id === id);
  if(index === -1){
    films.push(newFilm);
    serialize(jsonDbPath, films);
    return res.sendStatus(201).json(newFilm);
  }
  defaultFilms[index] = newFilm;
  serialize(jsonDbPath, films);
  return res.json(newFilm);
    
});


export default router;