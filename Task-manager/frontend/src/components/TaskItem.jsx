export function TaskItem ({ task, onToggle,onDelete,onEdit }){
    const completionLabel = task.completed ? "Completed" : "Pending";
    const formattedDate = new Date(task.createdAt).toLocaleDateString();
    return (
        <div className={`task-card ${task.completed ? "completed" : ""}`}>
            <h2 className="task-title">{task.title}</h2>
            <p className="task-description">{task.description}</p>

            <div className="task-meta">
                <span className={`priority-badge priority-${task.priority}`}>
                    {task.priority}
                </span>
                <span>{completionLabel} · Created: {formattedDate}</span>
            </div>

            <div className="task-actions">
                <button className="btn" onClick={() => onToggle(task.id)}>
                    {task.completed ? "Mark Pending" : "Mark Complete"}
                </button>
                <button className="btn" onClick={() => onEdit(task)}>
                    Edit
                </button>
                <button className="btn" onClick={() => onDelete(task.id)}>
                    Delete
                </button>
            </div>
        </div>
    )
}