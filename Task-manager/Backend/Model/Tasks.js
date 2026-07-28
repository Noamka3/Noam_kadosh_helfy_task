const tasks = [
    {
        id: 1,
        title: "Helfy",
        description: "Product DocktorABC",
        completed: false,
        createdAt: new Date().toISOString(),
        priority: "high",
      },
    
]

exports.getAllTasks = () => {
    return [...tasks];
  };


exports.createTask = (new_task) => {
   const NewTask = {
    id: getNewId(),
    title: new_task.title.trim(),
    description: new_task.description.trim() || "",
    completed: false,
    createdAt: new Date().toISOString(),
    priority: new_task.priority,

  };

  tasks.push(NewTask)
  return NewTask;

  }

  const getNewId = () => {
    if (tasks.length === 0){
      return 1;
    }

    const maxId = Math.max(...tasks.map(task => task.id ));
    return maxId +1;
  }
  
  exports.getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };


  exports.updateTaskById = (id,updates) => {
    const task = tasks.find((task) => task.id === id);

    if (!task){
      return null;
    }

    if (updates.title !== undefined) {
      task.title = updates.title.trim();
    }
    if (updates.description !== undefined) {
      task.description = updates.description.trim();
    }
    if (updates.priority !== undefined) {
      task.priority = updates.priority;
    }
    if (updates.completed !== undefined) {
      task.completed = updates.completed;
    }

    return task;
  };

  
  exports.toggleTaskById = (id) => {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    task.completed = !task.completed;

    return task;
  };

  exports.deleteById = (id) => {
    const task  =  tasks.findIndex((task) => task.id === id);

    if(task === -1){
      return false;
    }
    tasks.splice(task, 1);

    return true;
  }
