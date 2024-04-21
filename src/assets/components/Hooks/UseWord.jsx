import {useState} from "react";

export const WORD = [
    "avion",
    "belle",
    "chien",
    "droit",
    "eclat",
    "forme",
    "givre",
    "havre",
    "ideal",
    "jouer",
    "lourd",
    "mains",
    "noyer",
    "ombre",
    "porte",
    "quite",
    "rouge",
    "sable",
    "table",
    "usure",
    "vivre",
    "wagon",
    "xylo",
    "zebre",
];


export const UseWord = () => {
    const [word, setWord] = useState()

    const randomWord = () => {
        const index = Math.floor(Math.random() * WORD.length)
        setWord(WORD[index]);
        console.log(word)
    }

    return word ? word : randomWord();
    
}