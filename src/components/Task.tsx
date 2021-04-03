import React from "react";
import { FaTimes } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";

// Task component used to structure task / user list information, and provide interactable icons to update / delete information

/*
    Props:
    task - a single task object containing data from the task list
    users - user firstName and LastName data retrieved from user list
    onDelete - deletetask() - method passed that deletes a task list element based on task id
    onToggle - toggleComplete() - method which changes the task.isComplete boolean value when icon is clicked
    showUpdate - boolean value which toggles the display of the update form when icon is clicked
    getId - getId() - method passes to retrieve task.id value
    getTask - getTask() - method passed to retrieve task object data
*/

const Task = ({
  task,
  users,
  onDelete,
  onToggle,
  showUpdate,
  getId,
  getTask,
}: any) => (
  <div className={`task ${task.isComplete ? "completed" : ""}`}>
    <h3>
      {users}
      <div className="icon-bar">
        <span>
          <FaCheckSquare
            color={task.isComplete ? "green" : "black"}
            onClick={() => onToggle(task.id)}
          />
        </span>
        <span>
          <FaPen
            onClick={() => {
              showUpdate();
              getId(task);
              getTask(task);
            }}
          />
        </span>
        <FaTimes
          style={{ color: "red" }}
          onClick={() => {
            if (window.confirm("Delete the task?")) onDelete(task.id);
          }}
        />
      </div>
    </h3>
    <p>{task.name}</p>
  </div>
);

export default Task;
