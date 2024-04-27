import { Case } from "./Case.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Hooks/UseContextForLetter.jsx";
import { alphabet } from "./GameBoard.jsx";
import { UseWord } from "../Hooks/UseWord.jsx";
import { WinDialog } from "../Game/WinDialog.jsx";
import { LooseDialog } from "../Game/LooseDialog.jsx";

const gameStats = {
  win: 5,
  loose: 30,
  row: 6,
  casesPerRow: 5,
  endGameDelay: 500,
  reset_Delay: 2500,
  completionIds: [4, 9, 14, 19, 24, 29],
  color: {
    green: "bg-green-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  },
};

export const LineBoard = () => {
  const word = UseWord();
  const refs = useRef([]);
  const [currentId, setCurrentId] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const { setClassLetter } = useContext(Context);
  const [isWin, setIsWin] = useState(0);

  useEffect(() => {
    const caseKeys = refs.current;
    const keydownHandler = (e) => {
      const key = e.key.toUpperCase();
      const words = word && word.split("");
      let start = currentId - 5;
      let pointWinner = 0;

      if (isCompleted && e.key === "Enter" && words) {
        for (let i = start; i < currentId; i++) {
          setTimeout(
            () => {
              let comparisonIndex = i % 5;
              if (
                word.toUpperCase().includes(caseKeys[i].innerText) &&
                caseKeys[i].innerText.toUpperCase() ===
                  words[comparisonIndex].toUpperCase()
              ) {
                caseKeys[i].classList.add(gameStats.color.green);
                setClassLetter((prevClass) => ({
                  ...prevClass,
                  [caseKeys[i].innerText]: gameStats.color.green,
                }));
                pointWinner++;
                if (pointWinner === gameStats.win) {
                  setTimeout(() => setIsWin(1), 1500);
                }
              } else if (
                word.toUpperCase().includes(caseKeys[i].innerText) &&
                caseKeys[i].innerText.toUpperCase() !==
                  words[comparisonIndex].toUpperCase()
              ) {
                setClassLetter((prevClass) => ({
                  ...prevClass,
                  [caseKeys[i].innerText]: gameStats.color.orange,
                }));
                caseKeys[i].classList.add(gameStats.color.orange);
              } else {
                setClassLetter((prevClass) => ({
                  ...prevClass,
                  [caseKeys[i].innerText]: gameStats.color.red,
                }));
                caseKeys[i].classList.add(gameStats.color.red);
                if (currentId === gameStats.loose) {
                  setTimeout(() => setIsWin(2), gameStats.reset_Delay);
                }
              }
            },
            (i % 5) * 500,
          );
        }
        setTimeout(() => setIsCompleted(false), gameStats.reset_Delay);
      }

      if (alphabet.includes(key) && !isCompleted) {
        if (gameStats.completionIds.includes(currentId)) setIsCompleted(true);
        if (caseKeys[currentId] && !isCompleted) {
          caseKeys[currentId].innerText = key;
          setCurrentId((prevId) => prevId + 1);
        }
      } else if (e.key === "Backspace") {
        if (currentId > 0) {
          setIsCompleted(false);
          setCurrentId((prevId) => prevId - 1);
          caseKeys[currentId - 1].innerText = "";
        }
      }
    };

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [currentId, isCompleted]);

  return (
    <>
      {[...Array(gameStats.row)].map((_, rowIndex) => (
        <div key={rowIndex} className="m-1 flex justify-center gap-1">
          {[...Array(gameStats.casesPerRow)].map((_, caseIndex) => {
            const id = rowIndex * gameStats + caseIndex;
            return (
              <Case key={caseIndex} ref={(el) => (refs.current[id] = el)} />
            );
          })}
        </div>
      ))}
      {isWin === 1 && <WinDialog></WinDialog>}
      {isWin === 2 && <LooseDialog word={word}></LooseDialog>}
    </>
  );
};
