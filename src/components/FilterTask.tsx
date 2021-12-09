import React, {ChangeEvent, useState, FormEvent} from 'react';
import  TextField  from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { Button, Container } from "@material-ui/core";
import TodoForm from './TodoForm';


interface filterProps {
    users: user[];
    filterTasks: filterTasks;
    filterReset: fitlerReset;
    filterTrigger: boolean;
    toggleFilterTrigger: toggleFilterTrigger;
    filterClose: boolean

}
const FilterTask :React.FC<filterProps> = ({ users, filterTasks, filterReset, filterTrigger, toggleFilterTrigger, filterClose}) => {
    const [name, setName] = useState<string>("");   
    const [userId, setUserId] = useState<string>("");
    const [isComplete, setIsComplete] = useState<boolean>(false)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let filterTask: todo = {id: "", isComplete: isComplete, name: name, user: userId};
        filterTasks(filterTask);
    }
    const handleClose = () =>{
        if (filterClose) {
            toggleFilterTrigger(false) /// in order to close the filter popop you have to press reset filter
        }
        else{
            alert("Please reset the filter before you close the window");
        }
    }

    return (filterTrigger)? (
       
        <Container maxWidth = "md"> 
        <div className="filterForm">
        <form className="filter-form" onSubmit={handleSubmit}>
            <div className="form-control">
            <h3>Filter Tasks</h3>
            <label>Task Name</label>
            <TextField
                type="text"
                placeholder="By Task Name Containing"
                fullWidth
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
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
                <TextField {...params} label="By User" variant="standard" />
                )}
                autoSelect={true}
                onChange={(e, data) => setUserId(data!.id)}
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
                onClick={() => filterReset()}
            />
            <input
                type="button"
                value="Close"
                className="btn btn-block"
                onClick={handleClose}
            />
            
            </div>
        </form>
    </div></Container>
   ): <div></div>
    }

    export default FilterTask
