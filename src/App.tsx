import React from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";
import { useState, useEffect } from "react";
import axios from "axios";
import FilterButton from "./components/FilterButton";
import FilterForm from "./components/FilterForm";

// Written By Jyle Darling
// This Application is designed to be a todo list / task tracker using React and Typescript
// The App was required to include functions to:
// List Tasks
// Filter tasks by name, user, is completed
// Add Task
// Edit Task
// Delete Task
// Global State (React Hooks and Context Providers)

function App() {
  // State Hooks
  const [showAddTask, setShowAddTask] = useState(false); // Toggles Add Task Form
  const [showFilter, setShowFilter] = useState(false); // Toggles Filter Results Form
  const [showUpdateTask, setShowUpdateTask] = useState(false); // Toggles Update Task Form
  const [taskToUpdate, setTaskToUpdate] = useState<any>(); // Holds single Task Info for Update Form
  const [taskId, setTaskId] = useState<any>(); // Contains a single Task Id info
  const [tasks, setTasks] = useState<any>([]); // Contains Task List Info from Fetch and Changes
  const [filteredTasks, setFilteredTasks] = useState<any>([]); // Contains Pre Filtered Task List Info
  const [users, setUsers] = useState<any>([]); // Contains User List Info from Fetch

  // Fetche / Sets User and ToDo Lists from server.ts using axios
  const getTasksAndUsers = async () => {
    try {
      const fetchUsers = await axios.get("api/users");
      setUsers(fetchUsers.data.users);
      const fetchTasks = await axios.get("api/todos");
      setTasks(fetchTasks.data.todos);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Side Effect That Calls the Fetch Method
  useEffect(() => {
    getTasksAndUsers();
  }, []);

  // Add Task Method
  const addTask = (task: any) => {
    setTasks([...tasks, task]);
  };

  // Delete Task Method
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task: any) => task.id !== id));
  };

  // Get Task ID Method
  const getId = (task: any) => {
    setTaskId(task.id);
  };

  // Method to Return an Array Index from a Given Array, Attribute and Value
  function findWithAttr(array: any, attr: any, value: any) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return -1;
  }

  // Update Task Method
  const updateTask = (task: any) => {
    task.id = taskId;

    const index = findWithAttr(tasks, "id", task.id);

    if (index !== -1) {
      tasks[index] = task;
    }

    setTasks(tasks);
  };

  // Toggle Task Completed Method
  const toggleComplete = (id: string) => {
    setTasks(
      tasks.map((task: any) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  // Filter Results Method
  const filterResults = (task: any) => {
    setFilteredTasks(tasks);

    // Assigns Tasks to a Temp Array,
    // and Filter Task Form Details to Variables for Searching
    let tempFilter = tasks;
    const isComplete = task.isComplete;
    const name = task.name.toLowerCase();
    const user = task.user;

    // Filters Tasks based on IsComplete boolean
    tempFilter = tempFilter.filter(
      (task: any) => task.isComplete === isComplete
    );

    // Filters Tasks if name is Truthy and Tasks Contain name
    if (name) {
      tempFilter = tempFilter.filter((task: any) =>
        task.name.toLowerCase().includes(name)
      );
    }

    // Filters Tasks if user is Truthy and Tasks match user
    if (user) {
      tempFilter = tempFilter.filter((task: any) => task.user === user);
    }

    setTasks(tempFilter);
  };

  // Reset Filter Method
  const resetFilter = () => {
    if (filteredTasks.length) {
      setTasks(filteredTasks);
    }
  };

  return (
    <div className="container">
      <Header
        onAdd={() => {
          !showUpdateTask
            ? setShowAddTask(!showAddTask)
            : alert("Please Close Update Task Form");
        }}
        showAdd={showAddTask}
      />
      {showAddTask && !showUpdateTask && (
        <AddTask onAdd={addTask} userList={users} taskList={tasks} />
      )}
      {showUpdateTask && !showAddTask && (
        <UpdateTask
          onUpdate={updateTask}
          list={users}
          taskId={taskId}
          taskToUpdate={taskToUpdate}
          showUpdate={() =>
            showUpdateTask ? setShowUpdateTask(!showUpdateTask) : showUpdateTask
          }
        />
      )}
      <FilterButton
        showFilterBar={showFilter}
        onFilter={() => {
          setShowFilter(!showFilter);
        }}
      />
      {showFilter && (
        <FilterForm
          onFilter={filterResults}
          userList={users}
          resetFilter={resetFilter}
        />
      )}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          users={users}
          onDelete={deleteTask}
          onToggle={toggleComplete}
          getId={getId}
          getTask={setTaskToUpdate}
          showUpdate={() => {
            !showAddTask
              ? setShowUpdateTask(!showUpdateTask)
              : alert("Please Close New Task Form");
          }}
        />
      ) : (
        "No Tasks To Display"
      )}
    </div>
  );
}

export default App;
