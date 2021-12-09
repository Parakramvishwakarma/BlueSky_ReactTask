import React from 'react'
import { Button, Container } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
interface propsButton {
    toggleFilterTrigger : toggleFilterTrigger;
    toggleAddTaskTrigger: toggleAddTaskTrigger;
}

const FilterButton: React.FC<propsButton> = ({toggleFilterTrigger, toggleAddTaskTrigger}) => {
    return (
        <Container maxWidth= 'sm'>
        <div> 
            <Button startIcon= {<FilterListIcon />} onClick= {() => toggleFilterTrigger(true)} color= "secondary">Filter Tasks</Button>
            <Button startIcon= {<AddIcon />} onClick= {() => toggleAddTaskTrigger(true)} color= "secondary">Add Task</Button>
        </div>
        </Container>

    )
}

export default FilterButton;
