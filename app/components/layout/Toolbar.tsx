'use client';
import ToolbarButton from "../Elements/ToolbarButton";

const Toolbar = () => {

    const onCreateNewTodo = () => {
        console.log("Creating new Todo");
    }

    return (
        <div className="w-100 flex justify-between align-middle bg-dark px-5 py-3 text-light">
            <div>
                <ToolbarButton text={"Create New"} onClick={onCreateNewTodo} />
            </div>
            <div>
                <ToolbarButton text={"Logout"} onClick={onCreateNewTodo} />
            </div>
        </div>
    )
}

export default Toolbar;