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
    const [bufferedText, setBufferedText] = useState<string>(currText); // Local input buffer


    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {

        if(timerRef.current) {
            clearTimeout(timerRef.current);
            setBufferedText(currText)
            setEditing(true);
        } 

        timerRef.current = window.setTimeout(() => {
            timerRef.current = null;
        },300);
    }

    const handleBlur = () => {
        if(inputRef.current) {
            if(inputRef.current.value.length > 0)
                save();
        }
        
    }

    const checkForEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            if(inputRef.current) {
                if(inputRef.current.value.length > 0)
                    save();
            }
        }
    }

    const save = () => {
        setEditing(false);
        if(inputRef.current)
            setBufferedText(inputRef.current.value);
    }

    useEffect(() => {
        console.log("test: ",inputRef.current);
        if(inputRef.current) {
            inputRef.current.focus();
        }
    },[editing])

    return (
        <button onClick={handleClick}>
        {editing ? 
            <input 
            ref={inputRef} 
            onBlur={handleBlur} 
            onKeyDown={checkForEnter}
            value={bufferedText} // Controlled locally
            onChange={(e) => setBufferedText(e.target.value)} // Update local buffer
                    />
            :
            <p>{currText}</p>
        }
        </button>
    )
}

export default EditableInput;