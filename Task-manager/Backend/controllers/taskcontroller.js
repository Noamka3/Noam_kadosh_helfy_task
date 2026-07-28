const taskModel = require("../Model/Tasks");


exports.getAllTasks = (req, res) => {
    return res.status(200).json(taskModel.getAllTasks());

}

exports.createTask = (req, res) => {
    const { title, description = "", priority } = req.body;

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Title is required." });
    }
    
    if (!["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({ error:  "Priority must be 'low'| 'medium'| 'high'" });
    }


    const newTask = taskModel.createTask({ title, description, priority });

    return res.status(201).json(newTask);

}



exports.updateTask = (req, res) => {
    const taskId = Number(req.params.id);
    const { title, description, priority, completed } = req.body;

    if (!Number.isInteger(taskId)) {
        return res.status(400).json({
            error: "error",
        });
    }

    const Task_id = taskModel.getTaskById(taskId);


    if (title !== undefined && (typeof title !== "string" || !title.trim())) {
        return res.status(400).json({ error: "Title must be a non empty string." });
    }
    
    if (priority !== undefined && !["low", "medium", "high"].includes(priority)) {
        return res.status(400).json({ error: "Priority must be 'low'| 'medium'| 'high'" });
    }
    

    if (!Task_id) {
        return res.status(404).json({
            error: "Task not found.",
        });
    }


    const updatedTask = taskModel.updateTaskById(taskId, {
        title,
        description,
        priority,
        completed,
    });

    return res.status(200).json(updatedTask);
}


exports.toggleTask = (req, res) => {

    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) { //complete number
        return res.status(400).json({
            error: "Task id must be a valid number.",
        });
    }

    const updatedTask = taskModel.toggleTaskById(taskId);

    if (!updatedTask) {
        return res.status(404).json({
            error: "Task not found.",
        });
    }

    return res.status(200).json(updatedTask);

}

exports.deleteTask = (req, res) => {

    const taskId = Number(req.params.id);

    if (!Number.isInteger(taskId)) { //complete number
        return res.status(400).json({
            error: "Task id must be a valid number.",
        });
    }
     const bool = taskModel.deleteById(taskId);

    if(!bool){
        return res.status(404).json({
            error:"task not found",
        })
    }

    return res.status(204).send();

}