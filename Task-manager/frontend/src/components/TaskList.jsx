import { useEffect, useState } from "react";
import { TaskItem } from "./TaskItem";

const AUTO_ADVANCE_MS = 4000;

export function TaskList({ Tasks, onToggle, onDelete, onEdit }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= Tasks.length) {
      setIndex(0);
    }
  }, [Tasks.length, index]);

  useEffect(() => {
    if (Tasks.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % Tasks.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [Tasks.length]);

  if (Tasks.length === 0) {
    return <p className="empty-state">No tasks Found</p>;
  }

  const task = Tasks[index];

  return (
    <section className="carousel">
      <div className="carousel-viewport">
        <div key={task.id} className="carousel-slide">
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      </div>
    </section>
  );
}
