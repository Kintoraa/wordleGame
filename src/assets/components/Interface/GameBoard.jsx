import { CheckGame } from "../Game/CheckGame.jsx";
import { UseContextForLetter } from "../Hooks/UseContextForLetter.jsx";

export const GameBoard = ({ word }) => {
  return (
    <UseContextForLetter>
      <div className=" m-auto w-64">
        <CheckGame word={word}></CheckGame>
      </div>
    </UseContextForLetter>
  );
};
