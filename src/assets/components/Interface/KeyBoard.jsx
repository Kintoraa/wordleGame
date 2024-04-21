import { CaseKeyBoard } from "./Case.jsx";

export const KeyBoard = ({ setClicledKey }) => {
  return (
    <div className=" m-auto flex max-w-2xl flex-wrap gap-2">
      <CaseKeyBoard setClicledKey={setClicledKey}></CaseKeyBoard>
      <div></div>
    </div>
  );
};
