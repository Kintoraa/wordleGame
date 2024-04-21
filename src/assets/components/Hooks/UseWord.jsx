import { useEffect, useState } from "react";

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
  "zebre",
];

export const UseWord = () => {
  const [word, setWord] = useState();

  useEffect(() => {
    if (!word) {
      const index = Math.floor(Math.random() * WORD.length);
      setWord(WORD[index]);
    }
  }, []);

  return word;
};
