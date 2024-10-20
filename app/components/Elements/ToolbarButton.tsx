'use client';
import { FC } from "react";

interface buttonType {
    text: string;
    onClick: () => void;
}

const ToolbarButton: FC<buttonType> = (props) => {
    return (
        <button onClick={props.onClick}>
            {props.text}
        </button>
    )
}

export default ToolbarButton; 