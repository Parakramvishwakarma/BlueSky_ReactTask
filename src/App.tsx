import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./Components/TodoForm";
import TaskList from "./Components/TaskList";
import UpdateForm from "./Components/UpdateForm";
import FilterButton from "./Components/FilterButton";
import FilterTask from "./Components/FilterTask";
import Header from "./Components/Header";

function App() {
  // Hooks
  const [tasks, setTasks] = useState<todo[]>([]); 
  const [users, setUsers] = useState<user[]>([]);
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [taskToUpdate, setUpdateTask] = useState<any>()
  const [PreFilterTasks, setPrefilterTasks] = useState<todo[]>([]);
  const [filterTrigger, setFilterTrigger] = useState<boolean>(false);
  const [filterClose, setFilterClose] = useState<boolean>(true);
  const [addTaskTrigger, setAddTaskTrigger] = useState<boolean>(false);

  // Function to fetch the tasks and users from the api using axios and setting the user and tasks arrays
  const getTasksAndUsers = async () => {
    try {
      const fetchUsers = await axios.get("api/users");
      setUsers(fetchUsers.data.users);
      const fetchTasks = await axios.get("api/todos");
      setTasks(fetchTasks.data.todos);
    } catch (err: any) {
      console.error(err.message);
    }
  };

// hook to load in the users and tasks from the databse at the intial render of the page
  useEffect(() => {
    getTasksAndUsers();
  },[]);

  //function to change the boolean value needed to show the add task popup
  const toggleAddTask: toggleAddTaskTrigger = (addTaskShow) => {
    setAddTaskTrigger(addTaskShow)
  }

  //function to add a task into the array
  const addTask= (todo: todo) :void => {
    setTasks([todo, ...tasks]); // adds the new task at the start of the tasks array
    setPrefilterTasks(tasks)
  } 
  // function to delete a task from the tasks array
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task: any) => task.id !== id));
    setPrefilterTasks(tasks)
  };

  // fuinction to mark a task as complete if used 
  const toggleComplete: ToggleComplete = (id) => {
    setTasks(
      tasks.map((task: any) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
    setPrefilterTasks(tasks)
  };

  //function to open/close the update tab
  const toggleShowUpdate: toggleShowUpdate = (show) => {
    setShowUpdate(show);
  }

  // function to open or close the filter popup
  const toggleFilterTrigger: toggleFilterTrigger = (trigger) => {
    setFilterTrigger(trigger);
  }

// function to find a task by its id to assist in updating tasks gives index in the array -1 if its not in the array
  const findTask: findTask = (tasks, taskId) => {
    for(let i = 0; i < tasks.length; i ++) {
      if(tasks[i].id === taskId){
        return i
      }
    }
    return -1;
  }

  // function toupdate the task that was updated by the user in the tasks array
  const updateTask: updateTasks = (task) => {
    const index = findTask(tasks, task.id);
    if(index !== -1){
      tasks[index] = task;
    }
    setTasks(tasks)
    setPrefilterTasks(tasks);
  }

  // function to set what task is being updated
  const updateTaskSet = (task: todo) => {
    setUpdateTask(task);
  }

  const filterTasks: filterTasks = (task) =>{
    //defone the array that will is the original tasks
    setPrefilterTasks(tasks);
    setFilterClose(false); // the filter tab us not allowed to be closed until the filter close boolean is true
    let tempTasks = tasks;
    const filterName = task.name.toLowerCase();
    const filterUserId = task.user;
    const filterIsComplete = task.isComplete
    //fitler in terms of is complete 
    tempTasks = tempTasks.filter( (task: todo) => task.isComplete === filterIsComplete);
    //filter in terms of the user 
    if (filterUserId){
      tempTasks = tempTasks.filter( (task:todo) => task.user === filterUserId);
    }
    //checks if the name provided is existing and then filters on the basis of that
    if(filterName) {
      tempTasks = tempTasks.filter((task:todo) => (task.name.toLowerCase()).includes(filterName));
    }
    setTasks(tempTasks); // the filtered tasks are then set to be the main tasks so that they can be displayed
  }
  const filterReset: fitlerReset = () => {
    setTasks(PreFilterTasks); // the tasks are reverted back to the tasks array without any filter
    setFilterClose(true); // the filter is allowed to be closed after the fitler has been reset
  }

  
  return (
    <div className="parent">
      <Header />
      <div className = "ToDoAppForm">
        < TodoForm 
        addTask= {addTask} 
        tasks = {tasks} 
        users = {users} 
        addTaskTrigger = {addTaskTrigger} 
        toggleAddTaskTrigger = {toggleAddTask}/>
      </div>

      <div className="filterButton">  
        <FilterButton
         toggleFilterTrigger= {toggleFilterTrigger}
          toggleAddTaskTrigger= {toggleAddTask}/>
      </div>

      <div className="taskList">
        <TaskList 
        users= {users} 
        tasks = {tasks} 
        deleteTask = {deleteTask} 
        toggleComplete= {toggleComplete} 
        updateTaskSet={updateTaskSet} 
        toggleShowUpdate= {toggleShowUpdate}/>
      </div>

      <div className="pop-up">
        <UpdateForm 
        users= {users} 
        task = {taskToUpdate} 
        toggleShowUpdate = {toggleShowUpdate} 
        trigger= {showUpdate} 
        updateTasks={updateTask}/>
      </div>

      <div className="filter-popup">
        <FilterTask  
        users= {users}
        filterTasks={filterTasks}
        filterReset={filterReset} 
        filterTrigger= {filterTrigger} 
        toggleFilterTrigger={toggleFilterTrigger}
        filterClose = {filterClose}/>
      </div>
    </div>

  )
}

export default App;
