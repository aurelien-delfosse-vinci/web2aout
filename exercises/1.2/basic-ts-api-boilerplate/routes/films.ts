import {Router} from "express";
import { Film } from "../types";


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
let counter = 0;
router.get('/', (_req, res) => {
  counter++;
  console.log(_req.method + " COUNTER : " + counter);
  return res.json(defaultFilms);
});
export default router;