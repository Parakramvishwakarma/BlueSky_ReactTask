type user = {
    firstName : string,
    lastName: string,
    id: string
};

type todo = {
    id: string
    isComplete: boolean
    name: string
    user: string
}

type FindUser= (users: user[], userId: string) => user | undefined;
type ToggleComplete = (id: string) => void;
type DeleteTask = (id: string) => void;
type AddTask= (newTodo: todo) => void;
type toggleShowUpdate = (show: boolean) => void;
type findTask = (tasks:todo[], taskid: string) => number// returns the index of the task
type AddUser = (newUser: user) => void;
type updateTasks = (task:todo) => void;
type filterTasks = (task: todo) => void;
type fitlerReset = () => void;
type updateTaskSet = (task:todo) => void;
type toggleFilterTrigger = (filterShow: boolean) => void;
type toggleAddTaskTrigger = (addTaskShow: boolean) => void;