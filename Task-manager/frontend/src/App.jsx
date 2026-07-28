import { useEffect } from "react";
import { useState } from "react"
import {createTask,deleteTask,getTasks,toggleTask,updateTask,} from "./services/taskService";
import { TaskList } from "./components/TaskList"
import {TaskForm} from "./components/TaskForm"
import {TaskFilter} from "./components/TaskFilter"

function App() {
  const [tasks,setTasks] = useState([]);
  const [loading,setLoading] = useState(true);
  const [editingTask,setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");


  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    }
  
    if (filter === "pending") {
      return !task.completed;
    }
  
    return true;
  });


  async function handleDeleteTask(taskId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
  
    if (!confirmed) {
      return;
    }
  
    try {
      await deleteTask(taskId);
  
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
    } catch (error) {
      console.error(error.message);
    }
  }


  async function handleToggleTask(taskId) {
    try {
      const updatedTask = await toggleTask(taskId);
  
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleCreateTask(taskData) {
    try {
      const newTask = await createTask(taskData);

      setTasks((currentTasks) => [...currentTasks, newTask]);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  async function handleUpdateTask(taskId, taskData) {
    try {
      const existingTask = tasks.find((task) => task.id === taskId);

      const updatedTask = await updateTask(taskId, {
        ...taskData,
        completed: existingTask.completed,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      setEditingTask(null);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }



  function handleFormSubmit(taskData) {
    if (editingTask) {
      return handleUpdateTask(editingTask.id, taskData);
    }
    return handleCreateTask(taskData);
  }

  

  function handleEditClick(task) {
    setEditingTask(task);
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  useEffect(() => {
    async function loadTasks() {
      try{
        setLoading(true);

      const data = await getTasks();
      setTasks(data);
    }catch (error){
      console.error(error.message);

    }
    finally{
      setLoading(false);
    }
  }

    loadTasks();
  },[]);

  if(loading){
    return <p>Loading tasks...</p>
  }

  return (
    <main className="app">
      <h1 className="app-title">Task Manager</h1>
      <TaskFilter filter={filter} onFilterChange={setFilter} />

      <TaskList Tasks={filteredTasks} onToggle={handleToggleTask}  onDelete={handleDeleteTask} onEdit={handleEditClick}/>

      <TaskForm onSubmit={handleFormSubmit} editingTask={editingTask} onCancelEdit={handleCancelEdit} />
    </main>
  );
}

export default App
