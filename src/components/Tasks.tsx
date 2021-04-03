import React from "react";
import Task from "./Task";

// Tasks component used to map and structure single task component data with a combination of task list
// and user list information

/*
    Props:
    tasks - task list data 
    user - user list data
    onDelete - deletetask() - method passed that deletes a task list element based on task id
    onToggle - toggleComplete() - method which changes the task.isComplete boolean value when icon is clicked
    showUpdate - boolean value which toggles the display of the update form when icon is clicked
    getId - getId() - method passes to retrieve task.id value
    getTask - getTask() - method passed to retrieve task object data
*/

const Tasks = ({
  tasks,
  users,
  onDelete,
  onToggle,
  showUpdate,
  getId,
  getTask,
}: any) => {
  return (
    <>
      {tasks.map((task: any) => (
        <Task
          key={task.id}
          task={task}
          users={users
            .filter((user: any) => task.user === user.id)
            .map((user: any) => user.firstName + " " + user.lastName)}
          onDelete={onDelete}
          onToggle={onToggle}
          showUpdate={showUpdate}
          getId={getId}
          getTask={getTask}
        />
      ))}
    </>
  );
};

export default Tasks;
