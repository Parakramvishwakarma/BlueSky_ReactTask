import React, {ChangeEvent, useState, FormEventHandler} from "react";
import  TextField  from "@material-ui/core/TextField";

import { Container, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
interface FormProps {
    addTask: AddTask,
    tasks: todo[],
    users: user[],
    addTaskTrigger: boolean;
    toggleAddTaskTrigger: toggleAddTaskTrigger;
}

const TodoForm: React.FC<FormProps> = ({addTask, tasks, users, addTaskTrigger, toggleAddTaskTrigger}) => {
    // decalare the hooks 
    const [userId, setId] = useState<string>("");
    const [task, setTask] = useState<string>("");
    const [taskId, setTaskId]= useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean>(false);


    const handleUser = (e: ChangeEvent<{}>, data : (user| null)) => {
    if (data !== null) {
        setId(data.id)
    }
    }

    const handleSubmit = (e:any )=> {
        e.preventDefault();
        if (!task){
            alert("Please provide a task name");
            return;
        }
        else{
        let idTask = tasks.length +1 as unknown;
        setTaskId(idTask as string)
        addTask({id: taskId, isComplete: isComplete, name: task, user: userId});
        setTask("");
        setId("");
        setTaskId("");
        setIsComplete(false);
        toggleAddTaskTrigger(false);
        }
    }

    return (addTaskTrigger) ? (
      <Container maxWidth= "sm" >
        <form className="add-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <h3>New Task</h3>
          <label>Task Name</label>
          <TextField
            type="text"
            placeholder="New Task Name"
            fullWidth
            value={task}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
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
  
        <input type="submit" value="Save New Task" className="btn btn-block" />
        <input type="submit" value="Cancel" className="btn btn-block" onClick= {() => toggleAddTaskTrigger(false)} />
      </form>
      </Container>
    ): <div></div>
}
export default TodoForm;