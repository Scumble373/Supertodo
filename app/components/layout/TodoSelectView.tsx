/*
'use client'
import { useState } from "react";
import TodoPreview from "./TodoPreview"

interface SelectViewProps {
    todo
}

const TodoSelectView:React.FC = (handleSelect: (id: string) => void) => {

    const [todos, setTodos] = useState<Todo[]>([])

    
    return (
        <div className='w-[300px] flex-none h-100vh border-r border-secondary'>
            <button
                onClick={handleCreateTodo} 
                className={`w-100 h-[90px] border-y border-secondary flex justify-start items-center flex-row px-4 py-4 gap-5`}>
                <div className="w-[64px] flex justify-center">
                    <img className='rounded-full' src='/img/plus.png' width={32} height={32} alt='icon' />
                </div>
                <h4 className="font-semibold text-primary">Create New</h4>
            </button>
            <TodoPreview id='todo-1' title='test' updated='9/25/24' img='https://placehold.co/64' category='bg-flag1' />
            {todos.map(todos => 
                <TodoPreview key={todos.id} id={todos.id} title={todos.title} updated={todos.updated} img={todos.img} category={todos.category} />
            )}
        </div>
    )
}
*/
