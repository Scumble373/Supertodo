import Crosser from "./Crosser";
import EditableInput from "./EditableInput";
import { todoTaskType } from "@/app/todos/page";

interface extraProps {
    setSelected: (id: string, selected: boolean) => void
}
type todoProps = todoTaskType;// & extraProps;

const Todo = ({id, title, completed}: todoProps) => {

    const handleOnChange = () => {
        const newState = !completed;
       // setSelected(id, newState);
    }

    return (
        <div className="relative">
            <div className={`bg-white shadow p-4 flex justify-start align-center gap-3 opacity-100 transition ease-in-out ${completed && 'opacity-50'}`}>
                <input type='checkbox' checked={completed} id={id} name={id} onChange={handleOnChange}/>
                <EditableInput currText={title} forlabel={id}/>
            </div>
            {completed && <Crosser />}
        </div>
        
            
       
    )
}

export default Todo;