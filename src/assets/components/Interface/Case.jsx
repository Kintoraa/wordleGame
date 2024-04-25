import { forwardRef, useContext, useRef } from "react";
import { Context } from "../Hooks/UseContextForLetter.jsx";
import { alphabetKeyBoard } from "../general/alphabet.js";

export const Case = forwardRef(({ getText }, ref) => {
  return (
    <div
      className="flex size-10 items-center justify-center  rounded border border-gray-500 text-xl font-bold text-white"
      ref={ref}
    ></div>
  );
});

export const CaseKeyBoard = ({ setClicledKey }) => {
  const { classLetter } = useContext(Context);
  const ref = useRef();

  return (
    <>
      {alphabetKeyBoard.map((letter, i) => (
        <button
          className={` flex  items-center justify-center  rounded border border-gray-500 text-xl font-bold text-white ${
            classLetter[letter]
          } ${letter === "↵" || letter === "˿" ? "h-10 w-16" : "size-10 "}`}
          ref={ref}
          value={letter}
          key={letter}
          onClick={() => {
            const event = new KeyboardEvent("keydown", { key: letter });
            setClicledKey(event);
          }}
        >
          {letter}
        </button>
      ))}
    </>
  );
};
