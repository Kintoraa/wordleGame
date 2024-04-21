import { GameBoard } from "./GameBoard.jsx";
import LongMenu from "./Menu.jsx";

export const Background = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-gray-800 p-10">
      <LongMenu></LongMenu>
      <h1 className="border-b border-white pb-3 text-center text-2xl font-bold text-white">
        Wordle Challenge
      </h1>
      <GameBoard></GameBoard>
      <span className="">
        <a href={"https://github.com/Kintoraa/wordleGame"} target={"_blank"}>
          <i className="fa-brands fa-github cursor-pointer"> Github</i>
        </a>
      </span>
    </div>
  );
};
