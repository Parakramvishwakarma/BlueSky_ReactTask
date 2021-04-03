import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useState } from "react";

// Designed to provide a form to Filter task list via isComplete, name contains and user

/*
  Props:
   onfilter - filterResults() - filters the Task List based on selected criteria
   userList - list of users - used to populate user select menu
   resetFilter - resetFilter() - used to reset the filtered results to original task list
*/

const FilterForm = ({ onFilter, userList, resetFilter }: any) => {
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const onSubmit = (e: any) => {
    e.preventDefault();

    onFilter({ isComplete, name, user });
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="update-form-control">
        <h3>Filter Results...</h3>
        <label></label>
        <TextField
          type="text"
          placeholder="By Task Name Containing"
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
            <TextField {...params} label="By User" variant="standard" />
          )}
          autoSelect={true}
          onChange={(e, data) => setUser(data.id)}
        />
      </div>
      <div className="update-form-control form-control-check">
        <label>By Completed</label>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={(e) => setIsComplete(e.currentTarget.checked)}
        />
      </div>
      <div>
        <input type="submit" value="Filter Results" className="btn btn-block" />
        <input
          type="button"
          value="Reset Filter"
          className="btn btn-block"
          onClick={() => resetFilter()}
        />
      </div>
    </form>
  );
};

export default FilterForm;
