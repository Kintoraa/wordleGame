import { CheckGame } from "../Game/CheckGame.jsx";
import { UseContextForLetter } from "../Hooks/UseContextForLetter.jsx";

export const GameBoard = ({ word }) => {
  return (
    <UseContextForLetter>
      <CheckGame word={word}></CheckGame>
    </UseContextForLetter>
  );
};
