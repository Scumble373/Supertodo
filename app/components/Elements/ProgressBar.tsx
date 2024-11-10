import { TodoType } from "@/app/todos/page";

interface progressBarProps {
    todo: TodoType;
}

const ProgressBar = ({todo}: progressBarProps) => {

    const tasksCompleted = todo.tasks.reduce((acc,curr) => acc + (curr.completed ? 1 : 0),0);
    const progress = (tasksCompleted / todo.tasks.length) * 100;
    const color = tasksCompleted == todo.tasks.length ? 'bg-yellow-500' : 'bg-blue-500';
    return (
        <span className={`${color} h-1 block absolute start-0 bottom-0 transition-all duration-500 ease-in-out`} style={{ width: `${progress}%` }}></span>
    )
}

export default ProgressBar;