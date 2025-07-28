import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import TaskForm from "./components/TaskForm";

const API_URL = "http://localhost:5000/tasks";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    priority: "Medium",
  });
  const [showModal, setShowModal] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    if (!form.title.trim() || !form.dueDate) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await axios.post(API_URL, form);
      setForm({ title: "", dueDate: "", priority: "Medium" });
      setShowModal(false);
      fetchTasks();
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  const toggleDone = async (task) => {
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        done: !task.done,
      });
      fetchTasks();
    } catch (err) {
      console.error("Error updating task", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          📝 To-Do List
        </h1>

        {/* Add Button */}
        <div className="text-right mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            + Add Task
          </button>
        </div>

        {/* Task Table */}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white text-sm rounded">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-left">Priority</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`border-t ${
                      task.done ? "bg-green-50" : "bg-white"
                    }`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td
                      className={`p-3 font-medium ${
                        task.done ? "line-through text-gray-400" : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </td>
                    <td className="p-3">
                      {dayjs(task.dueDate).format("DD MMM YYYY")}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-medium ${
                          task.done
                            ? "bg-green-200 text-green-800"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {task.done ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => toggleDone(task)}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          task.done
                            ? "bg-gray-400 text-white hover:bg-gray-500"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {task.done ? "Undo" : "Done"}
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Add Task */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Add New Task
            </h2>
            <TaskForm
              form={form}
              onChange={handleInputChange}
              onCancel={() => setShowModal(false)}
              onSubmit={addTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
