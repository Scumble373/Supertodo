import Image from "next/image";
import { TodoType } from "@/app/todos/page";
import TodoPreviewTitle from "../Todo/TodoPreviewTitle";

type TodoPreview = Pick<TodoType, 'id' | 'title' | 'img' | 'updated' | 'category'>;

interface previewProps {
    todo: TodoType;
    setSelected: (id:string) => void
}

const TodoPreview = ({todo, setSelected}: previewProps) => {

    const handleClick = () => {
        setSelected(todo.id);
    }
    return (
        <button onClick={handleClick} className={`w-full h-[90px] shadow-md px-4 py-3 transition ease-in-out gap-4 relative ${todo.category} hover:translate-x-7 duration-300 animate-slideIn`}>
            <div className={` flex justify-start items-center flex-row gap-4`}>
                <img className='rounded-full' src={todo.img} width={64} height={64} alt='icon' />
                <div className="flex justify-start items-start flex-col">
                    <TodoPreviewTitle id={todo.id} title={todo.title}/>
                    <p className="text-primary opacity-75 font-extralight text-sm">{todo.updated}</p>
                </div>
            </div>
        </button>
    )
}

export default TodoPreview;