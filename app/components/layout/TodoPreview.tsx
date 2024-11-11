import Image from "next/image";
import { TodoType } from "@/app/todos/page";
import TodoPreviewTitle from "../Todo/TodoPreviewTitle";
import ProgressBar from "../Elements/ProgressBar";
import { convertDateTime } from "@/app/helpers/date";
import { useEffect } from "react";

type TodoPreview = Pick<TodoType, 'id' | 'title' | 'img' | 'updated' | 'category'>;

interface previewProps {
    todo: TodoType;
    setSelected: (id:string) => void;
    updateTodo: (todo:TodoType) => void;
    requestFocus: (set: boolean) => void;
}

const TodoPreview = ({todo, setSelected, updateTodo, requestFocus}: previewProps) => {

    const handleClick = () => {
        setSelected(todo.id);
    }

    const handleUpdateTitle = (newTitle: string) => {
        const newTodo = {...todo, title: newTitle};
        updateTodo(newTodo);
    }

    const handleRequestFocus = (set: boolean) => {
        requestFocus(set);
    }

    const tasksCompleted = todo.tasks.reduce((acc,curr) => acc + (curr.completed ? 1 : 0),0);
    return (
        <div onClick={handleClick} className={`flex align-center w-full h-[100px] shadow-md px-4 py-2 transition ease-in-out gap-4 relative ${todo.selected ? 'animate-slideOut' : 'animate-slideIn'} ${todo.category} duration-300`}>
            <div className="absolute right-3 top-3 w-full flex justify-end items-center gap-2">
                <span className={`${todo.category} w-[16px] h-[16px] border border-black cursor-pointer`}></span>
                <Image src={'/img/trash.svg'} width={16} height={16} alt="trash" className="cursor-pointer"/>
            </div>
            <div className="flex justify-between items-center">
                <div className={` flex justify-start items-center flex-row gap-4`}>
                    <img className='rounded-full' src={todo.img} width={64} height={64} alt='icon' />
                    <div className="flex justify-start items-start flex-col pt-3">
                        <TodoPreviewTitle id={todo.id} title={todo.title} updateTitle={handleUpdateTitle} requestFocus={handleRequestFocus}/>
                        <p className="text-primary opacity-75 font-extralight text-xs mb-2">{convertDateTime(todo.updated)}</p>
                    </div>
                </div>
                <></>
            </div>
            <div className="absolute right-2 bottom-2 w-full flex justify-end items-center gap-2">
                <p className="text-primary opacity-75 font-extralight text-xs text-right">{`Tasks: ${tasksCompleted} / ${todo.tasks.length}`}</p>
            </div>
            <ProgressBar todo={todo}/>
        </div>
    )
}

export default TodoPreview;