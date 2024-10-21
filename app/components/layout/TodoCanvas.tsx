import { TodoType } from "@/app/todos/page"
import { taskType } from "@/app/todos/page";
import Task from "../Todo/Task";
import { useEffect, useState } from "react";
import { useRef } from "react";

interface CanvasProps  {
    selectedTodo: TodoType | null;
    updateTodo: (todo:TodoType) => void;
}

const TodoCanvas: React.FC<CanvasProps> = ({selectedTodo, updateTodo}) => {

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

    useEffect(() => {
        if(textAreaRef.current)
        {
            textAreaRef.current.value = "";
            console.log("attempting to focus");
            textAreaRef.current.focus();
        }
    },[selectedTodo])
    if(!selectedTodo)
        return;

    console.log("Selected todo tasks: ",selectedTodo.tasks);
    const handleCreateTask = (text: string = "New Todo") => {
            if(selectedTodo.tasks) {
                const lastTodo = selectedTodo.tasks.length > 0 ? selectedTodo.tasks[selectedTodo.tasks.length - 1] : null;
                const lastIDNum = lastTodo ? parseInt(lastTodo.id.split("-")[1]) : 0;
                const incID = lastIDNum + 1;
    
                const newTask: taskType = {
                    id: `task-${incID}`,
                    title: text,
                    completed: false
                }
                console.log(text);
                selectedTodo.tasks = [...selectedTodo.tasks,newTask];
                const newSelectedTodo = selectedTodo;
                updateTodo(newSelectedTodo)
            }
        }

    const checkForEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === 'Enter') {
            event.preventDefault();
            handleCreateTask(event.currentTarget.value);
            event.currentTarget.value = "";
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
                <h2 className="text-3xl">{selectedTodo.title}</h2>

                {selectedTodo.tasks.map((task) => {
                    return <Task key={task.id} task={task} updateTask={updateTasks}/>
                })}
                
                <textarea ref={textAreaRef} className="w-full mt-5 border-0 outline-0 shadow-md focus:border-0 outline-0 p-5" placeholder="Type and press enter to create Todo" onKeyDown={checkForEnter}>

                </textarea>
            </div>  
            }
        </div>
    )
}

export default TodoCanvas;