'use client'

import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { TodoType } from "@/app/todos/page";

interface previewTitleProps {
    id: string,
    title: string
}

const TodoPreviewTitle = ({id, title}: previewTitleProps) => {

    const [updating, setUpdating] = useState<boolean>(false);
    const [clickCount, setClickCount] = useState<number>(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const InputRef = useRef<HTMLInputElement | null>(null);

    const testClick: MouseEventHandler<HTMLButtonElement> = () => {

        console.log("clicked");
        //Increment clicks
        setClickCount((prevClickCount) => prevClickCount + 1);

        //If a timer is already going, clear it
        if(timerRef.current)
            clearTimeout(timerRef.current);

        //Set a new timer for 300ms
        timerRef.current = setTimeout(() => {

            //It has been 300ms! Time to check for a double click
            console.log(`We clicked ${clickCount} times!`);
            //If our click count is greater than 1, we've double clicked. Set update to true
            if(clickCount > 0)
                setUpdating(true);
            
            //Reset the click count
            setClickCount(0);
        }, 300);
    }

    const saveTitle = (e: React.FocusEvent<HTMLInputElement>) => {
        //Update Title
    }

    useEffect(() => {
        if(InputRef.current)
            InputRef.current.value = title;
    },[])

    return (
        <>
            <button onClick={testClick}>
                {updating ? <input ref={InputRef} type='text' onBlur={saveTitle}/> : <h4 className="font-semibold text-primary">{title}</h4>}
            </button>
        </>
    )
}

export default TodoPreviewTitle;
