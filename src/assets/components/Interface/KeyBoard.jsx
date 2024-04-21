import {CaseKeyBoard} from "./Case.jsx";

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ↵'.split('');

export const KeyBoard = () => {

    const selectedLetter = (e) => {

    }

    return (
        <div className=" m-auto flex max-w-2xl flex-wrap gap-2">
            {alphabet.map((letter, i) => (
                <CaseKeyBoard text={letter} key={i} onClick={selectedLetter}></CaseKeyBoard>
            ))}
        </div>
    )
}