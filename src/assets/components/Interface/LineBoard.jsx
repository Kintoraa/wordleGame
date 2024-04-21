import {Case} from "./Case.jsx";
import {useEffect, useRef, useState} from "react";


export const LineBoard = () => {
    const refs = useRef([]);
    const rows = 6;
    const casesPerRow = 5;
    const [clickedLetter, setClickedLetter] = useState("");
    const [currentId, setCurrentId] = useState(0);

    const getText = (id) => {
        console.log(id)
        if (id >= 0 && id < rows * casesPerRow) {
            return refs.current[id].innerText;

        }
        return "";
    };

    useEffect(() => {
        const keydownHandler = (e) => {
            const key = e.key.toUpperCase();
            if (key >= 'A' && key <= 'Z') {
                while (refs.current[currentId] && refs.current[currentId].innerText && currentId < rows * casesPerRow) {
                    setCurrentId(prevId => prevId + 1);
                }
                if (refs.current[currentId]) {
                    refs.current[currentId].innerText = key;
                    setCurrentId(prevId => prevId + 1);
                }
            }
        };

        window.addEventListener('keydown', keydownHandler);

        return () => {
            window.removeEventListener('keydown', keydownHandler);
        }
    }, [currentId]);

    return (
        <>
            {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className="m-1 flex justify-center gap-1">
                    {[...Array(casesPerRow)].map((_, caseIndex) => {
                        const id = rowIndex * casesPerRow + caseIndex;
                        return (
                            <Case
                                key={caseIndex}
                                ref={(el) => (refs.current[id] = el)}
                                id={String(id)}
                                text={clickedLetter}
                                getText={() => getText(id)}
                            />
                        );
                    })}
                </div>
            ))}
        </>
    )
};