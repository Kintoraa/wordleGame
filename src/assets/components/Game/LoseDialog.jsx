import loose from "../../sounds/loose.mp3";

export const LoseDialog = ({ word }) => {
  const loose_mp3 = new Audio(loose);
  loose_mp3.volume = 0.2;
  loose_mp3.play();
  return (
    <dialog
      open={true}
      className={
        "absolute top-1/2 flex size-80 -translate-y-1/2 flex-col items-center justify-center gap-4 rounded-lg border  border-white bg-gray-800"
      }
    >
      <h1 className="text-2xl font-bold text-red-700">Tu as perdu !</h1>
      <p className={"font-bold  text-white"}>
        Le mot étais : {word.toUpperCase()}
      </p>
      <button
        className="h-10 w-1/2 rounded-lg border bg-orange-400"
        onClick={() => window.location.reload()}
      >
        Rejouer
      </button>
    </dialog>
  );
};
