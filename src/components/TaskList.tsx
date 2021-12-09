import React from "react";
import ListItem from "./ListItem"


interface TaskListProps {
    users: user[];
    tasks: todo[];
    toggleComplete: ToggleComplete;
    deleteTask : DeleteTask;
    updateTaskSet: updateTaskSet;
    toggleShowUpdate: toggleShowUpdate;
}

const TaskList: React.FC<TaskListProps> = ({users, tasks, toggleComplete, deleteTask, updateTaskSet, toggleShowUpdate}) => {

    return (
        <ul> 
        {tasks.map((task: todo) => (
                <ListItem
                key={task.id}
                task={task}
                user={users
                  .filter((user: any) => task.user === user.id)
                  .map((user: any) => user.firstName + " " + user.lastName)}
                deleteTask={deleteTask}
                ToggleComplete={toggleComplete}
                updateTaskSet= {updateTaskSet}
                toggleShowUpdate= {toggleShowUpdate}
                />
        ))}
        </ul>
    )
}

export default TaskList;

