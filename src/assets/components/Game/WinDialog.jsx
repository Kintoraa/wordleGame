import { Confetti } from "../animation/Confetti.jsx";
import win from "../../sounds/confetti.mp3";
import { useEffect } from "react";

export const WinDialog = () => {
  useEffect(() => {
    const win_mp3 = new Audio(win);
    win_mp3.volume = 0.2;
    win_mp3.play();
  }, []);

  return (
    <dialog
      open={true}
      className={
        "absolute top-1/2 flex size-80 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg border  border-white bg-gray-800"
      }
    >
      <h1 className="text-2xl font-bold text-white">Tu as gagné ! Bravo ! </h1>
      <button
        className="h-10 w-1/2 rounded-lg border bg-orange-400"
        onClick={() => window.location.reload()}
      >
        Rejouer
      </button>
      <Confetti value={true}></Confetti>
    </dialog>
  );
};
