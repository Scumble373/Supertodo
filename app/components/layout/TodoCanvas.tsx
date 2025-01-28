import { TodoType } from "@/app/todos/page"
import { taskType } from "@/app/todos/page";
import Task from "../Todo/Task";
import { useEffect, useState } from "react";
import { useRef } from "react";

interface CanvasProps  {
    selectedTodo: TodoType | null;
    updateTodo: (todo:TodoType) => void;
    allowedFocus: boolean;
}

const TodoCanvas: React.FC<CanvasProps> = ({selectedTodo, updateTodo, allowedFocus}) => {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const [reset, setReset] = useState<boolean>(true);

    useEffect(() => {
        console.log("request focus canvas", allowedFocus);
        if(textAreaRef.current && allowedFocus)
        {
            if(reset)
                textAreaRef.current.value = "";
            textAreaRef.current.focus();
        }
        else if(!allowedFocus) {
            if(textAreaRef.current)
                textAreaRef.current.blur();
        }
        if(titleRef.current)
            titleRef.current.value = selectedTodo.title;
    },[selectedTodo,allowedFocus]);

    if(!selectedTodo)
        return;

    const handleCreateTask = (text: string = "New Todo") => {
        const tempName = "";
        if(selectedTodo.tasks) {
            const lastTodo = selectedTodo.tasks.length > 0 ? selectedTodo.tasks[selectedTodo.tasks.length - 1] : null;
            const lastIDNum = lastTodo ? parseInt(lastTodo.id.split("-")[1]) : 0;
            const incID = lastIDNum + 1;

            const newTask: taskType = {
                id: `task-${incID}`,
                title: text,
                completed: false
            }
            selectedTodo.tasks = [...selectedTodo.tasks,newTask];
            const newSelectedTodo = selectedTodo;
            updateTodo(newSelectedTodo)
        }
    }

    const handleTitleBlurEvent = (event: React.FocusEvent<HTMLInputElement>) => { 
        if(titleRef.current.value.length > 0)
        {
            let newTodo = selectedTodo;
            newTodo = {...newTodo, title : titleRef.current.value}
            updateTodo(newTodo);
        }
    }

    const handleBlurEvent = (event: React.FocusEvent<HTMLTextAreaElement>) => { 
        if(textAreaRef.current.value.length > 0)
        {
            setReset(true);
            handleCreateTask(textAreaRef.current.value);
            textAreaRef.current.value = "";
        }
    }

    const checkForEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            if(textAreaRef.current.value.length > 0)
            {
                setReset(true);
                handleCreateTask(event.currentTarget.value);
                event.currentTarget.value = "";
            }
        }
        else if(event.key === 'Backspace') {
            console.log("Backspace pressed");
            if(textAreaRef.current.value.length <=0 && selectedTodo.tasks.length > 0) {
                event.preventDefault();
                //Get the data from the previous task, set it back to the textarea and delete it
                let newTodo = selectedTodo;
                let prevTask = selectedTodo.tasks[selectedTodo.tasks.length -1];
                console.log(prevTask.title);
                textAreaRef.current.value = prevTask.title;
                newTodo.tasks = selectedTodo.tasks.filter(task => task.id != prevTask.id);
                setReset(false);
                updateTodo(newTodo);
            }
        }
    }

    const updateTasks = (newTasks: taskType) => {
        selectedTodo.tasks = selectedTodo.tasks.map((task) => {
            if(task.id === newTasks.id)
                return newTasks;
            else 
                return task;
        })

        updateTodo(selectedTodo);
    }

    

    return (
        <div className="flex-1 p-10">
            {selectedTodo && 
                <div>
                    <h2 className="hidden md:block text-3xl">{selectedTodo.title}</h2>
                    <input className="block md:hidden" type="text" ref={titleRef} onBlur={handleTitleBlurEvent}></input>
                    {selectedTodo.tasks.map((task) => {
                        return <Task key={task.id} task={task} updateTask={updateTasks}/>
                    })}
                    <textarea 
                        ref={textAreaRef} 
                        className="w-full mt-5 border-0 outline-0 focus:border-0 p-5" 
                        placeholder="Type and press enter to create Todo" 
                        onKeyDown={checkForEnter}
                        onBlur={handleBlurEvent}>
                    </textarea>
                </div>  
            }
        </div>
    )
}

export default TodoCanvas;