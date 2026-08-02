import {Router} from "express";
import { createOneText, readAllTexts, readOneText, replaceOneText, deleteOneText } from "../services/texts";
import { NewText } from "../types";

const router = Router();
const levels = ["easy", "medium", "hard"];

router.get("/", (req, res) => {
    const level = req.query.level as string;

    const texts = readAllTexts(level);
    return res.json(texts);
});

router.get("/:id", (req,res) => {
    const id = req.params.id;
    const text = readOneText(id);
    if(!text) return res.sendStatus(404);
    return res.json(text);
});

router.post("/", (req,res) => {
    const body: unknown = req.body;

    if(
        !body || typeof body !== "object" ||
        !("content" in body) ||
        !("level" in body) || 
        typeof body.content !== "string" || 
        typeof body.level !== "string" ||
        !body.content.trim() || 
        !levels.includes(body.level)
    ) {
        return res.sendStatus(400);
    }

    const {content, level} = body as NewText;

    const createdText = createOneText({content, level});

    return res.sendStatus(201).json(createdText);
});

router.delete("/:id", (req,res) => {
    const id = req.params.id;
    const deletedText = deleteOneText(id);
    if(!deletedText) return res.sendStatus(404);

    return res.json(deletedText);
});

router.put("/:id", (req,res) => {
    const id = req.params.id;
    const body: unknown = req.body;

    if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof body.content !== "string" ||
    typeof body.level !== "string" ||
    !body.content.trim() ||
    !levels.includes(body.level)
  ) {
    return res.sendStatus(400);
  }

  const {content, level} = body as NewText;

  const text = replaceOneText(id, {content, level});

  return res.json(text);
});

export default router;