import { LineBoard } from "./LineBoard.jsx";
import { KeyBoard } from "./KeyBoard.jsx";
import { UseContextForLetter } from "../Hooks/UseContextForLetter.jsx";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ↵".split("");

export const GameBoard = ({ word }) => {
  return (
    <UseContextForLetter>
      <div className=" m-auto w-64">
        <LineBoard word={word}></LineBoard>
      </div>
      <KeyBoard></KeyBoard>
    </UseContextForLetter>
  );
};
