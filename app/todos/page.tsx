'use client'
/*v0.1*/
import TodoCanvas from "../components/layout/TodoCanvas"
import TodoPreview from "../components/layout/TodoPreview";
import { MouseEventHandler, useState } from "react";
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
    const [drawerState, setDrawerState] = useState<string>("closed");

    const setClosed = () => {setDrawerState("closed")}
    const setOpen = () => {setDrawerState("open")}

    const toggleDrawer = () => {
        setDrawerState((currState) => {
            if(currState == "opening" || currState == "closing")
                return;

            if(currState == "open") {
                setTimeout(setClosed, 500);
                return "closing";
            } else {
                setTimeout(setOpen, 500);
                return "opening";
            }
        })
    }
    const handleToggleDrawer: MouseEventHandler<HTMLButtonElement> = () => {
        toggleDrawer();
        
    }

    const handleSelectingTodo = (id: string) => {
       
        toggleDrawer();
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
        setCanvasFocused(true);
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
        console.log("requesting:",set);
        setCanvasFocused(!set);
    }

    return (
        <section>  
            <div className="flex justify-start align-top flex-wrap md:flex-nowrap">
                <div className={`absolute md:relative z-10 flex justify-start align-top flex-nowrap ${(drawerState == 'opening' || drawerState == 'open') ? 'animate-draweropen md:animate-none' : 'animate-drawerclose md:animate-none'}`}>
                    <div className={`w-[350px] bg-white flex h-100vh overflow-y-auto overflow-x-clip pe-5 no-scrollbar relative md:flex flex-nowrap md:flex-wrap flex-col items-start justify-start`}>
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
                    <button className={`p-4 block md:hidden absolute top-[0px] right-[-40px] rounded-lg bg-white`} onClick={handleToggleDrawer}>{'>'}</button>
                    <button className={`p-4 block md:hidden absolute top-[0px] right-[0px] rounded-lg bg-white`} onClick={handleToggleDrawer}>X</button>
                </div>
                <TodoCanvas selectedTodo={todos.find((todo) => todo.selected == true)} updateTodo={updateTodo} allowedFocus={canvasFocused}/>
            </div>
        </section>
    )
}

export default TodoPage;