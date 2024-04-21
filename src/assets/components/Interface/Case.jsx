import {forwardRef} from "react";

export const Case = forwardRef(({text, id, getText}, ref) => {
    return (
        <div className="flex size-10 items-center justify-center  rounded border border-gray-500">
            <p className="text-xl font-bold text-white" ref={ref}>{text}</p>
        </div>
    )
})

export const CaseKeyBoard = ({text}) => {
    return (
        <div className="flex size-10 items-center justify-center  rounded border border-gray-500">
            <p className="text-xl font-bold text-white">{text}</p>
        </div>
    )
}