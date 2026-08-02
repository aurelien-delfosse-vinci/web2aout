import {v4 as uuid} from "uuid";
import { Text, NewText } from "../types";
import path from "node:path";
import {parse, serialize} from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/texts.json");

const defaultTexts: Text[] = [
    {
    id: uuid(),
    content: "The quick brown fox jumps over the lazy dog.",
    level: "easy",
  },
  {
    id: uuid(),
    content: "Programming is the art of solving problems with code.",
    level: "medium",
  },
  {
    id: uuid(),
    content:
      "Concurrency introduces challenges that require careful synchronization.",
    level: "hard",
  },
];


function readAllTexts(level:string): Text[] {
    const texts = parse(jsonDbPath, defaultTexts);
    if(!level) return texts;

    return texts.filter((text) => text.level === level);
}

function readOneText(id:string): Text | undefined {
    const texts = parse(jsonDbPath,defaultTexts);
    const text = texts.find((text) => text.id === id);
    if(!text) return undefined;
    return text;
}

function createOneText(newText: NewText): Text {
    const texts = parse(jsonDbPath, defaultTexts);
    const createdText: Text = {
        id: uuid(),
        ...newText,
    };

    texts.push(createdText);
    serialize(jsonDbPath, texts);
    return createdText;
}

function deleteOneText(id:string): Text | undefined {
    const texts = parse(jsonDbPath, defaultTexts);
    const index = texts.findIndex((text) => text.id === id);
    if(index === -1) return undefined;
    const deletedText = texts.splice(index, 1);
    serialize(jsonDbPath, texts);
    return deletedText[0];
}

function replaceOneText(id:string, newText: NewText): Text {
    const texts = parse(jsonDbPath,defaultTexts);
    const index = texts.findIndex((text) => text.id === id);
    const text: Text = {
            id,
            ...newText,
        };
    if(index === -1){

        texts.push(text);
    }else{
        texts[index] = text; 
    }

    serialize(jsonDbPath, texts);
    return text;
}

export {readAllTexts, readOneText, createOneText,deleteOneText,replaceOneText};