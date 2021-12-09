import {Container, Box,Button, IconButton, ButtonGroup } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import { createTheme, ThemeProvider } from "@material-ui/core";
import React, { ChangeEvent, MouseEvent, useState, useEffect } from "react";


interface listItemProps {
    user: string[]
    task: todo
    deleteTask: DeleteTask
    ToggleComplete: ToggleComplete
    updateTaskSet: updateTaskSet
    toggleShowUpdate: toggleShowUpdate
}

const ListItem: React.FC<listItemProps> =({user, task, deleteTask, ToggleComplete, updateTaskSet, toggleShowUpdate}) => {
    // console.log("function call from the list item to get the user of hte task", task);
    // let user =findUser(users, task.user) ;
    // console.log(user?.firstName, user?.lastName);
    const handleDelete = (e:any) => {
        deleteTask(task.id);
    }
    const handleDone = (e:any) => {
        ToggleComplete(task.id);
    }
    const handleEdit = (e:any) => {
        updateTaskSet(task);
        toggleShowUpdate(true);
    }
    return (
        <Container maxWidth= "sm" >        
        <Box maxWidth = "sm" sx={{ p: 2, border: '1px dashed grey'} }>
        <div className= {task.isComplete? "completed" : "incomplete"}>
            <h2>{user}</h2>
            <p className= "TaskName">{task.name}</p>
            {/* <ButtonGroup color="secondary" aria-label="outlined secondary button group"> */}
            <IconButton onClick= {handleDelete} color= "secondary"><DeleteIcon /></IconButton>
            <IconButton onClick= {handleDone} color= {task.isComplete? "primary" : "secondary"}> <DoneIcon/></IconButton>
            <IconButton onClick= {handleEdit} color= "secondary"><EditIcon/></IconButton>
            {/* </ButtonGroup> */}
            </div> 
    </Box></Container>

    )
}

export default ListItem;