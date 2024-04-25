import { CaseKeyBoard } from "./Case.jsx";

export const KeyBoard = ({ setClicledKey }) => {
  return (
    <div className=" m-auto flex max-w-96 flex-wrap gap-2">
      <CaseKeyBoard setClicledKey={setClicledKey}></CaseKeyBoard>
    </div>
  );
};
