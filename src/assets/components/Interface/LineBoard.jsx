import { Case } from "./Case.jsx";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Hooks/UseContextForLetter.jsx";
import { alphabet } from "./GameBoard.jsx";
import { UseWord } from "../Hooks/UseWord.jsx";

export const LineBoard = () => {
  const word = UseWord();
  const refs = useRef([]);
  const rows = 6;
  const casesPerRow = 5;
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
                caseKeys[i].classList.add("bg-green-500");
                setClassLetter((prevClass) => ({
                  ...prevClass,
                  [caseKeys[i].innerText]: "bg-green-500",
                }));
                pointWinner++;
                if (pointWinner === 5) {
                  setTimeout(() => setIsWin(1), 1500);
                }
              } else if (
                word.toUpperCase().includes(caseKeys[i].innerText) &&
                caseKeys[i].innerText.toUpperCase() !==
                  words[comparisonIndex].toUpperCase()
              ) {
                setClassLetter((prevClass) => ({
                  ...prevClass,
                  [caseKeys[i].innerText]: "bg-orange-500",
                }));
                caseKeys[i].classList.add("bg-orange-500");
              } else {
                setClassLetter((prevClass) => ({
                  ...prevClass,
                  [caseKeys[i].innerText]: "bg-red-500",
                }));
                caseKeys[i].classList.add("bg-red-500");
                if (currentId === 30) {
                  setTimeout(() => setIsWin(2), 2500);
                }
              }
            },
            (i % 5) * 500,
          );
        }
        setTimeout(() => setIsCompleted(false), 2500);
      }

      if (alphabet.includes(key) && !isCompleted) {
        if ([4, 9, 14, 19, 24, 29].includes(currentId)) setIsCompleted(true);
        if (caseKeys[currentId] && !isCompleted) {
          caseKeys[currentId].innerText = key;
          setCurrentId((prevId) => prevId + 1);
        }
      } else if (e.key === "Backspace" && !isCompleted) {
        if (currentId > 0 && currentId > Math.floor(currentId / 5) * 5) {
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
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="m-1 flex justify-center gap-1">
          {[...Array(casesPerRow)].map((_, caseIndex) => {
            const id = rowIndex * casesPerRow + caseIndex;
            return (
              <Case key={caseIndex} ref={(el) => (refs.current[id] = el)} />
            );
          })}
        </div>
      ))}
      {isWin === 1 && (
        <dialog
          open={true}
          className={
            "absolute top-1/2 flex size-80 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg border  border-white bg-gray-800"
          }
        >
          <h1 className="text-2xl font-bold text-white">YOU WIN</h1>
          <button
            className="h-10 w-1/2 rounded-lg border bg-orange-400"
            onClick={() => window.location.reload()}
          >
            Rejouer
          </button>
        </dialog>
      )}
      {isWin === 2 && (
        <dialog
          open={true}
          className={
            "absolute top-1/2 flex size-80 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg border  border-white bg-gray-800"
          }
        >
          <h1 className="text-2xl font-bold text-red-700">YOU LOSE</h1>
          <button
            className="h-10 w-1/2 rounded-lg border bg-orange-400"
            onClick={() => window.location.reload()}
          >
            Rejouer
          </button>
        </dialog>
      )}
    </>
  );
};
