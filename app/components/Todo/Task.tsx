import Crosser from "./Crosser";
import EditableInput from "./EditableInput";
import { taskType, TodoType } from "@/app/todos/page";

interface extraProps {
    updateTask: (task: taskType) => void
}
interface taskProps {
    task: taskType;
    updateTask: (task: taskType) => void;
}

const Task: React.FC<taskProps> = ({task, updateTask}) => {

    const handleOnChange = () => {
        const newTask: taskType = {...task, completed: !task.completed};
        updateTask(newTask);
    }

    return (
        <div className="relative cursor-pointer" onClick={handleOnChange}>
            <div className={`bg-white shadow p-4 flex justify-start align-center gap-3 opacity-100 transition ease-in-out ${task.completed && 'opacity-50'}`}>
                <input type='checkbox' checked={task.completed} id={task.id} name={task.id} onChange={handleOnChange}/>
                <EditableInput currText={task.title} forlabel={task.id}/>
            </div>
            {task.completed && <Crosser />}
        </div>
    )
}

export default Task;