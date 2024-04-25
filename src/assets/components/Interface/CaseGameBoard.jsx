import { Case } from "./Case.jsx";
import { useRef } from "react";

export const CaseGameBoard = ({ setClickledKey }) => {
  const refs = useRef([]);
  return (
    <>
      {[...Array(6)].map((_, rowIndex) => (
        <div key={rowIndex} className="m-1 flex justify-center gap-1">
          {[...Array(5)].map((_, caseIndex) => {
            const id = rowIndex * 5 + caseIndex;
            return (
              // eslint-disable-next-line react/rop-types
              <Case
                key={caseIndex}
                ref={(el) => (refs.current[id] = el)}
                setClickledKey={setClickledKey}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};
