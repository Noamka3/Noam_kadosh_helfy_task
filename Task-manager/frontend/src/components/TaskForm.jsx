import { useState, useEffect } from "react";

export function TaskForm({onSubmit, editingTask, onCancelEdit}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description);
            setPriority(editingTask.priority);
        } else {
            setTitle("");
            setDescription("");
            setPriority("medium");
        }
        setFormError("");
    }, [editingTask]);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!title.trim()) {
            setFormError("Title is required.");
            return;
          }
          setFormError("");

        const taskData = {
            title: title.trim(),
            description: description.trim(),
            priority,
        };

        const success = await onSubmit(taskData);

        if(success){
            setTitle("");
            setDescription("");
            setPriority("medium");
        }
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
        <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>

        <div className="form-field">
        <label htmlFor="title">Title</label>

        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
        />
      </div>

       <div className="form-field">
        <label htmlFor="description">Description</label>

        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter task description"
        />
      </div>

      <div className="form-field">
        <label htmlFor="priority">Priority</label>

        <select
          id="priority"
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {formError && <p className="form-error">{formError}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">{editingTask ? "Update Task" : "Create Task"}</button>

        {editingTask && (
          <button type="button" className="btn" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>

        </form>
    );
}