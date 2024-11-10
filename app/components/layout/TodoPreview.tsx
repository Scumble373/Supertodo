import Image from "next/image";
import { TodoType } from "@/app/todos/page";
import TodoPreviewTitle from "../Todo/TodoPreviewTitle";
import ProgressBar from "../Elements/ProgressBar";

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
    return (
        <div onClick={handleClick} className={`w-full h-[90px] shadow-md px-4 py-3 transition ease-in-out gap-4 relative ${todo.category} hover:translate-x-7 duration-300 animate-slideIn`}>
            <div className={` flex justify-start items-center flex-row gap-4`}>
                <img className='rounded-full' src={todo.img} width={64} height={64} alt='icon' />
                <div className="flex justify-start items-start flex-col">
                    <TodoPreviewTitle id={todo.id} title={todo.title} updateTitle={handleUpdateTitle} requestFocus={handleRequestFocus}/>
                    <p className="text-primary opacity-75 font-extralight text-sm">{todo.updated}</p>
                </div>
            </div>
            <ProgressBar todo={todo}/>
        </div>
    )
}

export default TodoPreview;