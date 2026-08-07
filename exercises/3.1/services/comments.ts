import path from "node:path";
import { parse, serialize } from "../utils/json";
import { Comment, NewComment } from "../types";

const jsonDbPath = path.join(__dirname, "../data/comments.json");

const defaultComments: Comment[] = [];

function readAllComments(filmId?: number): Comment[] {
  const comments = parse(jsonDbPath, defaultComments);

  if (filmId === undefined) {
    return comments;
  }

  return comments.filter((comment) => comment.filmId === filmId);
}

function readOneComment(id: number): Comment | undefined {
  const comments = parse(jsonDbPath, defaultComments);

  return comments.find((comment) => comment.id === id);
}

function createOneComment(
  newComment: NewComment,
  username: string,
): Comment {
  const comments = parse(jsonDbPath, defaultComments);

  const nextId =
    comments.reduce(
      (maxId, comment) => (comment.id > maxId ? comment.id : maxId),
      0,
    ) + 1;

  const createdComment: Comment = {
    id: nextId,
    filmId: newComment.filmId,
    content: newComment.content,
    username,
  };

  comments.push(createdComment);

  serialize(jsonDbPath, comments);

  return createdComment;
}

function deleteOneComment(id: number): Comment | undefined {
  const comments = parse(jsonDbPath, defaultComments);

  const index = comments.findIndex((comment) => comment.id === id);

  if (index === -1) {
    return undefined;
  }

  const deletedComment = comments.splice(index, 1)[0];

  serialize(jsonDbPath, comments);

  return deletedComment;
}


export {readAllComments, readOneComment, createOneComment, deleteOneComment};