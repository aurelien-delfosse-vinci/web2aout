import { Router } from "express";
import { authorize } from "../utils/auths";
import { createOneComment, deleteOneComment, readAllComments, readOneComment } from "../services/comments";
import { AuthenticatedRequest, NewComment } from "../types";
import { readOneFilm } from "../services/films";


const router = Router();


router.get("/", authorize, (req, res) => {
    const filmId = req.query.filmId;

  if (filmId === undefined) {
    return res.json(readAllComments());
  }

  const filmIdNumber = Number(filmId);

  if (Number.isNaN(filmIdNumber)) {
    return res.sendStatus(400);
  }

  return res.json(readAllComments(filmIdNumber));
});

router.post("/", authorize, (req: AuthenticatedRequest,res) =>{
    const body: unknown = req.body;

     if (
      !body ||
      typeof body !== "object" ||
      !("filmId" in body) ||
      !("content" in body) ||
      typeof body.filmId !== "number" ||
      typeof body.content !== "string" ||
      !body.content.trim()
    ) {
      return res.sendStatus(400);
    }

    if(!req.user) return res.sendStatus(401);

    const film = readOneFilm(body.filmId);

    if(!film) return res.sendStatus(404);

    const comments = readAllComments(body.filmId);

    const alreadyCommented = comments.find((comment) => comment.username === req.user!.username);
    if(alreadyCommented) return res.sendStatus(409);

    const newComment: NewComment = {
        filmId:body.filmId,
        content:body.content,
    };

    const createdComment = createOneComment(newComment, req.user.username);

    return res.sendStatus(201).json(createdComment);

},);


router.delete("/:id", authorize, (req:AuthenticatedRequest, res) =>{
    if(!req.user) return res.sendStatus(401);
    const id = Number(req.params.id);

    if(Number.isNaN(id)) return res.sendStatus(400);

    const comment = readOneComment(id);

    if(!comment) return res.sendStatus(404);

    if(comment.username !== req.user.username) return res.sendStatus(403);

    const deletedComment = deleteOneComment(id);

    return res.json(deletedComment);
},);

export default router;  