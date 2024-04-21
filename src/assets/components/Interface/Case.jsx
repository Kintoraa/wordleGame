import { forwardRef, useContext, useRef } from "react";
import { alphabet } from "./GameBoard.jsx";
import { Context } from "../Hooks/UseContextForLetter.jsx";

export const Case = forwardRef(({ getText }, ref) => {
  return (
    <div
      className="flex size-10 items-center justify-center  rounded border border-gray-500 text-xl font-bold text-white"
      ref={ref}
    ></div>
  );
});

export const CaseKeyBoard = () => {
  const { classLetter } = useContext(Context);
  const ref = useRef();

  return (
    <>
      {alphabet.map((letter, i) => (
        <div
          className={`flex size-10 items-center justify-center  rounded border border-gray-500 text-xl font-bold text-white ${classLetter[letter]} `}
          ref={ref}
          value={letter}
          key={letter}
        >
          {letter}
        </div>
      ))}
    </>
  );
};
