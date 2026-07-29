const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/tasks";



export async function deleteTask(taskId) {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "DELETE",
    });
  
    if (!response.ok) {
      const errorData = await response.json();
  
      throw new Error(
        errorData.error || "Failed to delete task."
      );
    }
  }
  
export async function getTasks() {
    const res = await fetch(API_URL);

    if(!res.ok){
        throw new Error("Failed to load tasks.");
    }

    return res.json();

}

export async function createTask(taskData) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create task.");
      }

      return res.json();
    
}

export async function updateTask(taskId, taskData) {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.error || "Failed to update task."
      );
    }

    return response.json();
  }

export async function toggleTask(taskId) {
    const response = await fetch(`${API_URL}/${taskId}/toggle`, {
      method: "PATCH",
    });
  
    if (!response.ok) {
      const errorData = await response.json();
  
      throw new Error(
        errorData.error || "Failed to update task status."
      );
    }
  
    return response.json();
  }