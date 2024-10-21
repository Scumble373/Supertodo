'use client'

import TodoCanvas from "../components/layout/TodoCanvas"
import TodoPreview from "../components/layout/TodoPreview";
import { useState } from "react";
import { getDateString } from "../helpers/date";

export interface todoTaskType {
    id: string;
    title: string;
    completed: boolean;
}


export interface TodoType {
    id: string;
    img: string;
    title: string;
    created: string;
    updated: string;
    due?: string;
    tasks: todoTaskType[];
    completed: number;
    category: string;
}



const TodoPage: React.FC = () => {

    const [todos, setTodos] = useState<TodoType[]>([]);
    const [selectedTodo, setSelectedTodo] = useState<TodoType | null>(null)

    const handleSelectingTodo = (id: string) => {
        if(todos) {
            const findMe = todos.find((todo) => todo.id == id);
            console.log(findMe);
            if(findMe)
                setSelectedTodo(findMe);
        }
    }

    function handleCreateTodo() {
        setTodos((currentTodos) => {
            const lastTodo = currentTodos.length > 0 ? currentTodos[currentTodos.length - 1] : null;
            const lastIDNum = lastTodo ? parseInt(lastTodo.id.split("-")[1]) : 0;
            const incID = lastIDNum + 1;

            const currDate = getDateString();
            const newTodo: TodoType = {
                id: `todo-${incID}`,
                img: 'https://placehold.co/64',
                title: "New Todo",
                created: currDate,
                updated: currDate,
                tasks: [],
                completed: 0,
                category: `bg-flag${Math.floor(Math.random() * 9)+1}`
            }
            return [...currentTodos,newTodo];
        })
    }

    return (
        <section className="flex justify-start align-top">
            <div className='w-[300px] flex-none h-100vh'>
                <button
                    onClick={handleCreateTodo} 
                    className={`w-full h-[90px] shadow-md flex justify-start items-center flex-row px-4 py-4 gap-5`}>
                    <div className="w-[64px] flex justify-center">
                        <img className='rounded-full' src='/img/plus.png' width={32} height={32} alt='icon' />
                    </div>
                    <h4 className="font-semibold text-primary">Create New</h4>
                </button>
                {todos.map(todo => 
                    todo && <TodoPreview key={todo.id} todo={todo} setSelected={handleSelectingTodo}/>
                )}
            </div>
            <TodoCanvas selectedTodo={selectedTodo}/>
        </section>
    )
}

export default TodoPage;