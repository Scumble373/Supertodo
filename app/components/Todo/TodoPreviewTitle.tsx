'use client'

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { TodoType } from "@/app/todos/page";

interface previewTitleProps {
    id: string;
    title: string;
    updateTitle: (title:string) => void;
    requestFocus: (set: boolean) => void;
}

const TodoPreviewTitle = ({id, title, updateTitle, requestFocus}: previewTitleProps) => {

    const [updating, setUpdating] = useState<boolean>(false);
    const [clickCount, setClickCount] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const InputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if(InputRef.current)
            InputRef.current.focus();
            
    },[InputRef.current, updating]);

    const testClick: MouseEventHandler<HTMLButtonElement> = () => {

        console.log("clicked");
        //Increment clicks
        setClickCount((prevClickCount) => prevClickCount + 1);

        //If a timer is already going, clear it
        if(timerRef.current)
            clearTimeout(timerRef.current);

        //Set a new timer for 300ms
        timerRef.current = setTimeout(() => {
            //If our click count is greater than 1, we've double clicked. Set update to true
            if(clickCount > 0)
            {
                setUpdating(true);
                requestFocus(true);
            }  

            //Reset the click count
            setClickCount(0);
        }, 300);
    }

    const saveTitle = () => {
        setUpdating(false);
        requestFocus(false);
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        updateTitle(e.currentTarget.value);
        saveTitle();
    }

    useEffect(() => {
        if(InputRef.current)
            InputRef.current.value = title;
    },[updating])

    const checkForEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            if(InputRef.current.value.length > 0)
            {
                updateTitle(event.currentTarget.value);
                saveTitle();
            }
        }
    }

    return (
        <>
            <button onClick={testClick}>
                {updating ? <input ref={InputRef} type='text' onBlur={handleOnBlur} onKeyDown={checkForEnter}/> : <h4 className="font-semibold text-primary">{title}</h4>}
            </button>
        </>
    )
}

export default TodoPreviewTitle;
