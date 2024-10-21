import { TodoType } from "@/app/todos/page"
import { todoTaskType } from "@/app/todos/page";
import Todo from "../Todo/Todo";
import { useState } from "react";

interface CanvasProps  {
    selectedTodo: TodoType | null;
}

const TodoCanvas: React.FC<CanvasProps> = ({selectedTodo}) => {

    const [tasks, setTasks] = useState<todoTaskType[]>(selectedTodo ? selectedTodo.tasks : []);

    const handleCreateTodo = (text: string = "New Todo") => {
        setTasks((currTasks) => {
            if(currTasks) {
                const newTasks = currTasks;
                const lastTodo = newTasks.length > 0 ? newTasks[newTasks.length - 1] : null;
                const lastIDNum = lastTodo ? parseInt(lastTodo.id.split("-")[1]) : 0;
                const incID = lastIDNum + 1;
    
                const newTask: todoTaskType = {
                    id: `task-${incID}`,
                    title: text,
                    completed: false
                }
                
                return [...newTasks,newTask];
            }
            else
                return [];
            
        })
    }

    const checkForEnter = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(event.key === 'Enter') {
            handleCreateTodo(event.currentTarget.value);
            event.currentTarget.value = "";
        }
    }

    return (
        <div className="flex-1 p-10">
            {selectedTodo && 
            <div>
                <h2 className="text-3xl">{selectedTodo.title}</h2>

                {tasks.map((todo) => {
                    return <Todo id={todo.id} title={todo.title} completed={todo.completed}/>
                })}
                
                <textarea className="w-full h-100vh mt-5" placeholder="Type and press enter to create Todo" onKeyDown={checkForEnter}>

                </textarea>
            </div>  
            }
        </div>
    )
}

export default TodoCanvas;