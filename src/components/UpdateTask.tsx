import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";

// Designed to provide a form to update Tasks data

/*
  Props:
   onUpdate - updateTask() - updates a specific task with data entered into form
   list - list of users - used to populate user select menu
   showUpdate - boolean value used to show the form
   taskToUpdate - task data used to prefill form with existing task data (not working for User Select Menu)
*/

const UpdateTask = ({ onUpdate, list, showUpdate, taskToUpdate }: any) => {
  const [name, setName] = useState(taskToUpdate.name);
  const [user, setUser] = useState(taskToUpdate.user);
  const [isComplete, setIsComplete] = useState(taskToUpdate.isComplete);

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (!name) {
      alert("Please add a task");
      return;
    }
    let id = 0;

    onUpdate({ isComplete, name, id, user });

    setName("");
    setUser("");
    setIsComplete(false);
    showUpdate();
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="update-form-control">
        <h3>Update Task</h3>
        <label>Task</label>
        <TextField
          type="text"
          placeholder="Update Task Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <Autocomplete
          id="standard-full-width"
          options={list}
          fullWidth
          getOptionLabel={(list: any) => list.firstName + " " + list.lastName}
          renderInput={(params) => (
            <TextField {...params} label="Select User" variant="standard" />
          )}
          autoSelect={true}
          onChange={(e, data) => setUser(data.id)}
        />
      </div>
      <div className="update-form-control form-control-check">
        <label>Completed</label>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={(e) => setIsComplete(e.currentTarget.checked)}
        />
      </div>
      <div>
        <input type="submit" value="Update Task" className="btn btn-block" />
        <input
          type="button"
          value="Cancel"
          className="btn btn-block"
          onClick={() => showUpdate()}
        />
      </div>
    </form>
  );
};

export default UpdateTask;
