import {GameBoard} from "./Interface/GameBoard.jsx";
import {KeyBoard} from "./Interface/KeyBoard.jsx";

export const Background = () => {
    return (
        <div className="flex h-screen w-screen flex-col bg-gray-800 p-10">
            <h1 className="text-center text-2xl font-bold text-white">WORLDE</h1>
            <GameBoard></GameBoard>
            <KeyBoard></KeyBoard>
        </div>
    )
}