'use client'
import { ChangeEventHandler, InputHTMLAttributes, KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState } from "react";

interface inputProps {
    currText: string;
    forlabel: string;
}

const EditableInput: React.FC<inputProps> = ({currText, forlabel}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const timerRef = useRef<number | null>(null);
    const [newText, setNewText] = useState<string>(currText)
    const [editing, setEditing] = useState<boolean>(false);
    const [clickNum, setClickNum] = useState<number>(0);


    console.log("curr text:",currText);
    const updateText: ChangeEventHandler<HTMLInputElement> = (e) => {
        console.log(e.currentTarget.value);
    }

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {

        if(timerRef.current) {
            clearTimeout(timerRef.current);
            setEditing(true);
        } 

        timerRef.current = window.setTimeout(() => {
            timerRef.current = null;
        },300);
    }

    const handleBlur = () => {
        save();
    }

    const checkForEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            save();
        }
    }

    const save = () => {
        setEditing(false);
        if(inputRef.current)
            setNewText(inputRef.current.value);
    }

    useEffect(() => {
        if(inputRef.current) {
            inputRef.current.focus();
            inputRef.current.value = newText;
        }
    },[editing])

    return (
        <button onClick={handleClick}>
        {editing ? 
            <input ref={inputRef} onChange={updateText} onBlur={handleBlur} onKeyDown={checkForEnter}/>
            :
            <p>{currText}</p>
        }
        </button>
    )
}

export default EditableInput;