import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../Hooks/UseContextForLetter.jsx";
import { UseWord } from "../Hooks/UseWord.jsx";
import { LooseDialog } from "./LooseDialog.jsx";
import { WinDialog } from "./WinDialog.jsx";
import { Case } from "../Interface/Case.jsx";
import { KeyBoard } from "../Interface/KeyBoard.jsx";
import { alphabet } from "../general/alphabet.js";
import correct from "../../sounds/good.mp3";
import veryGood from "../../sounds/correct.mp3";
import error from "../../sounds/error.mp3";

const gameStats = {
  win: 5,
  loose: 30,
  row: 5,
  endGameDelay: 500,
  reset_Delay: 2500,
  completionIds: [4, 9, 14, 19, 24, 29],
  color: {
    green: "bg-green-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  },
  audio: {
    correct: correct,
    good: veryGood,
    error: error,
  },
};

export const CheckGame = () => {
  const word = UseWord();
  const { setClassLetter } = useContext(Context);
  const refs = useRef([]);
  const [currentId, setCurrentId] = useState(0);
  const [isCompletedRow, setIsCompletedRow] = useState(false);
  const [isCheckin, setIsCheckin] = useState(false);
  const [isWin, setIsWin] = useState(0);
  const [clickledKey, setClickedKey] = useState("");

  useEffect(() => {
    const caseKeys = refs.current;
    const keydownHandler = (e) => {
      const key = e.key.toUpperCase();
      const words = word && word.split("");
      let start = currentId - gameStats.row;
      let pointWinner = 0;

      if (words && isCompletedRow && (key === "ENTER" || key === "↵")) {
        checkLetter(start, words, pointWinner);
      }

      if (alphabet.includes(key) && !isCompletedRow) addText(key);
      if (
        key === "BACKSPACE" ||
        (key === "˿" && !caseKeys[currentId].classList.contains("checked"))
      )
        removeText();
    };

    const addClass = (index, color, audio) => {
      const mp3 = new Audio(audio);
      mp3.play();
      caseKeys[index].classList.add(color);
      caseKeys[index].classList.add("checked");
    };

    const addText = (key) => {
      if (gameStats.completionIds.includes(currentId)) setIsCompletedRow(true);
      if (caseKeys[currentId] && !isCompletedRow) {
        caseKeys[currentId].innerText = key;
        setCurrentId((prevId) => prevId + 1);
      }
    };

    const removeText = () => {
      if (
        currentId > 0 &&
        !isCheckin &&
        !caseKeys[currentId - 1].classList.contains("checked")
      ) {
        setIsCompletedRow(false);
        setCurrentId((prevId) => prevId - 1);
        caseKeys[currentId - 1].innerText = "";
      }
    };
    const checkLetter = (start, words, pointWinner) => {
      setIsCheckin(true);
      setIsCompletedRow(true);
      for (let i = start; i < currentId; i++) {
        setTimeout(
          () => {
            let comparisonIndex = i % gameStats.row;
            // Very Good Letter
            if (
              word.toUpperCase().includes(caseKeys[i].innerText) &&
              caseKeys[i].innerText.toUpperCase() ===
                words[comparisonIndex].toUpperCase()
            ) {
              addClass(i, gameStats.color.green, gameStats.audio.good);
              addColorKeyBoard(i, gameStats.color.green);
              pointWinner++;
              if (pointWinner === gameStats.win) {
                setTimeout(() => setIsWin(1), gameStats.endGameDelay);
              }
              // Correct Letter
            } else if (
              word.toUpperCase().includes(caseKeys[i].innerText) &&
              caseKeys[i].innerText.toUpperCase() !==
                words[comparisonIndex].toUpperCase()
            ) {
              addColorKeyBoard(i, gameStats.color.orange);
              addClass(i, gameStats.color.orange, gameStats.audio.correct);
              // Error Letter
            } else {
              addColorKeyBoard(i, gameStats.color.red);
              addClass(i, gameStats.color.red, gameStats.audio.error);
              if (currentId === gameStats.loose) {
                setTimeout(() => setIsWin(2), 2500);
              }
            }
          },
          (i % gameStats.row) * 1200,
        );
      }
      setTimeout(() => {
        setIsCompletedRow(false);
        setIsCheckin(false);
      }, gameStats.reset_Delay);
    };

    const addColorKeyBoard = (index, color) => {
      setClassLetter((prevClass) => ({
        ...prevClass,
        [caseKeys[index].innerText]: color,
      }));
    };

    if (clickledKey) {
      keydownHandler(clickledKey);
      setClickedKey(null);
    }

    window.addEventListener("keydown", keydownHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [currentId, isCompletedRow, isCheckin, clickledKey]);

  return (
    <>
      <div className=" m-auto ">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="m-1 flex justify-center gap-1">
            {[...Array(5)].map((_, caseIndex) => {
              const id = rowIndex * 5 + caseIndex;
              return (
                <Case key={caseIndex} ref={(el) => (refs.current[id] = el)} />
              );
            })}
          </div>
        ))}
      </div>
      {isWin === 1 && <WinDialog></WinDialog>}
      {isWin === 2 && <LooseDialog word={word}></LooseDialog>}
      <KeyBoard setClicledKey={setClickedKey}></KeyBoard>
    </>
  );
};
