import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";

// Designed to provide a form for new Tasks to be added to the Task List

/*
  Props:
   onAdd - addTask() - creates a new task with data entered into form
   userList - list of users - used to populate user select menu
   taskList - list of tasks - used to create an id number (this method is flawed, but easily rectified with entries stored in a database)
*/

const AddTask = ({ onAdd, userList, taskList }: any) => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a task");
      return;
    }

    const id: any = taskList.length + 1;

    onAdd({ id, isComplete, name, user });

    // Clears Values for more entries
    setName("");
    setUser("");
    setIsComplete(false);
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <h3>New Task</h3>
        <label>Task Name</label>
        <TextField
          type="text"
          placeholder="New Task Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Autocomplete
          id="standard-full-width"
          options={userList}
          fullWidth
          getOptionLabel={(userList: any) =>
            userList.firstName + " " + userList.lastName
          }
          renderInput={(params) => (
            <TextField {...params} label="Select User" variant="standard" />
          )}
          autoSelect={true}
          onChange={(e, data) => setUser(data.id)}
        />
      </div>

      <div className="form-control form-control-check">
        <label>Completed</label>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={(e) => setIsComplete(e.currentTarget.checked)}
        />
      </div>

      <input type="submit" value="Save New Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
