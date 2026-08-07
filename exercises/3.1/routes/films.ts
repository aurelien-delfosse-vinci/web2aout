import {Router} from "express";
import { createOneFilm, deleteOneFilm, readAllFilms, readOneFilm, replaceOneFilm, updateOneFilm } from "../services/films";
import { NewFilm } from "../types";
import { authorize } from "../utils/auths";


const router = Router();

router.get('/', (req, res) => {
  const minDuration = Number(req.query["duration-min"]);
  const films = readAllFilms(minDuration);
  return res.json(films);
});

router.get("/:id",(req,res) => {
  const id = Number(req.params.id);
  const film = readOneFilm(id);
  if(!film) return res.sendStatus(404);
  return res.json(film);
});

router.post("/", authorize, (req,res) => {
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

  const newFilm = createOneFilm({title, director, duration, budget, description, imageUrl});
  if(!newFilm) return res.sendStatus(409);
  return res.json(newFilm);
});

router.delete("/:id",authorize, (req,res) => {
  const id = Number(req.params.id);
  const deletedFilm = deleteOneFilm(id);
  if(!deletedFilm) return res.sendStatus(404);

  return res.json(deletedFilm);
});

router.patch("/:id",authorize, (req,res) => {
  const id = Number(req.params.id);

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

  const updatedFilm = updateOneFilm(id, {title,director,duration,budget,description,imageUrl});
  if(!updatedFilm) return res.sendStatus(404);
  return res.json(updatedFilm);
});


router.put("/:id", authorize, (req, res) => {
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

  const {title, director, duration, budget, description, imageUrl} = body as NewFilm;

  const newFilm = replaceOneFilm(id, {title,director,duration,budget,description,imageUrl});
  return res.json(newFilm);
    
});


export default router;