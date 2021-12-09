import React, {useState, ChangeEvent} from 'react'
import  TextField  from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { Button, Container } from "@material-ui/core";
import TaskList from './TaskList';

interface updateProps {
    users: user[];
    task: todo;
    toggleShowUpdate: toggleShowUpdate;
    trigger: boolean;
    updateTasks: updateTasks;
}
const UpdateForm: React.FC<updateProps>= ({users, task, toggleShowUpdate, trigger, updateTasks}) => {
        const [userId, setId] = useState<string>("");
        const [taskName, setTaskName] = useState<string>("");
        const [isComplete, setIsComplete] = useState<boolean>(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("submit button has just been pressed")

        task.name = taskName;
        console.log("new task name: ", taskName);
        task.isComplete = isComplete;
        console.log("new iscomplete name: ", isComplete);
        task.user = userId;
        console.log("new userid is : ", userId);
        updateTasks(task);
        toggleShowUpdate(false);
    }
    const handleUser = (e: ChangeEvent<{}>, data : (user| null)) => {
        if (data !== null) {
            setId(data.id);
        }
    }
    return (trigger)? (
        <Container maxWidth= "md" >
        <div className="popup">
        <form className="update-form" onSubmit = {handleSubmit}>
        <div className="form-control">
          <h3>Update Task</h3>
          <label>Task Name</label>
          <TextField
            type="text"
            placeholder="UpdateTask Name"
            fullWidth
            value={taskName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskName(e.target.value)}
          />
        </div>
        <div>
          <Autocomplete
            id="standard-full-width"
            options={users}
            fullWidth
            getOptionLabel={(userList: any) =>
              userList.firstName + " " + userList.lastName
            }
            renderInput={(params) => (
              <TextField {...params} label="Select User" variant="standard" />
            )}
            autoSelect={true}
            onChange={handleUser}
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
  
        <input type="submit" value="Update Task" className="btn btn-block" />
        <input type="submit" value="Cancel" className="btn btn-block" onClick = {() => toggleShowUpdate(false)}/>
      </form>

      </div>
      </Container>
    ): <div></div>;
}

export default UpdateForm
