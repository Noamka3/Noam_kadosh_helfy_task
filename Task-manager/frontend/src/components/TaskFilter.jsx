export function TaskFilter({ filter, onFilterChange }) {
    return (
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
        />

        <button
          type="button"
          className={`filter-btn ${filter === "all" ? "active" : ""}`}
          onClick={() => onFilterChange("all")}
        >
          All
        </button>

        <button
          type="button"
          className={`filter-btn ${filter === "completed" ? "active" : ""}`}
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </button>

        <button
          type="button"
          className={`filter-btn ${filter === "pending" ? "active" : ""}`}
          onClick={() => onFilterChange("pending")}
        >
          Pending
        </button>
      </div>
    );
  }