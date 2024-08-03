import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/todos");
        setTodos(response.data);
      } catch (error) {
        setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchTodos();
  }, [token]);

  const handleCreate = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/todos", {
        title,
      });
      setTodos([...todos, response.data]);
      setTitle("");
    } catch (error) {
      setError("Failed to add todo");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/api/todos/${id}`,
        { completed: true }
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    } catch (error) {
      setError("Failed to update todo");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleCreate}>Add Todo</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <li key={todo._id} className={todo.completed ? "complete" : ""}>
                {todo.title}
                <div>
                  {!todo.completed && (
                    <button onClick={() => handleUpdate(todo._id)}>
                      Complete
                    </button>
                  )}
                  <button onClick={() => handleDelete(todo._id)}>Delete</button>
                </div>
              </li>
            ))
          ) : (
            <p>No todos yet</p>
          )}
        </ul>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;
