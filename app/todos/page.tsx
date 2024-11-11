'use client'

import TodoCanvas from "../components/layout/TodoCanvas"
import TodoPreview from "../components/layout/TodoPreview";
import { useState } from "react";
import { getDateString } from "../helpers/date";

export interface taskType {
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
    tasks: taskType[];
    completed: number;
    category: string;
    selected: boolean;
}

const TodoPage: React.FC = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [canvasFocused, setCanvasFocused] = useState<boolean>(false);

    const handleSelectingTodo = (id: string) => {
        if(!canvasFocused)
            return;
        if(todos) {
            setCanvasFocused(true);
            setTodos((currTodos) => {
                const newTodos = currTodos.map((todo: TodoType) => {
                    if(todo.id == id)
                        return {...todo, selected: true};
                    else
                        return {...todo, selected: false};
                })
                return newTodos;
            })
        }
    }

    function handleCreateTodo() {
        setCanvasFocused(true);
        setTodos((currentTodos) => {
            const lastTodo = currentTodos.length > 0 ? currentTodos[0] : null;
            const lastIDNum = lastTodo ? parseInt(lastTodo.id.split("-")[1]) : 0;
            const incID = lastIDNum + 1;
            const currDate = getDateString();
            const updatedTodos = currentTodos.map((todo) => {
                return {...todo, selected:false}
            })
            const newTodo: TodoType = {
                id: `todo-${incID}`,
                img: 'https://placehold.co/64',
                title: "New Todo",
                created: currDate,
                updated: currDate,
                tasks: [],
                completed: 0,
                selected: true,
                category: `bg-flag${Math.floor(Math.random() * 9)+1}`
            }
            return [newTodo, ...updatedTodos];
        })
    }

    const updateTodo = (updatedTodo: TodoType) => {
        console.log("Attempting to update todo: ",updatedTodo.id," : ",updatedTodo);
        setTodos((currTodos) => {
            const newTodos = currTodos.map((todo: TodoType) => {
                if(todo.id == updatedTodo.id)
                    return updatedTodo;
                else
                    return todo;
            })
            return newTodos;
        })
    }

    const requestFocus = (set: boolean) => {
        setCanvasFocused(!set);
    }

    return (
        <section className="flex justify-start align-top">
            <div className='w-[350px] flex-none h-100vh overflow-y-auto overflow-x-clip pe-5 no-scrollbar'>
                <button
                    onClick={handleCreateTodo} 
                    className={`w-full h-[90px] shadow-md flex justify-start items-center flex-row px-4 py-4 gap-5`}>
                    <div className="w-[64px] flex justify-center">
                        <img className='rounded-full' src='/img/plus.png' width={32} height={32} alt='icon' />
                    </div>
                    <h4 className="font-semibold text-primary">Create New</h4>
                </button>
                {todos.map(todo => 
                    todo && <TodoPreview key={todo.id} todo={todo} setSelected={handleSelectingTodo} updateTodo={updateTodo} requestFocus={requestFocus}/>
                )}
            </div>
            <TodoCanvas selectedTodo={todos.find((todo) => todo.selected == true)} updateTodo={updateTodo} allowedFocus={canvasFocused}/>
        </section>
    )
}

export default TodoPage;