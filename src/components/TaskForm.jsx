// src/components/TaskForm.jsx
import React from "react";

const TaskForm = ({ form, onChange, onCancel, onSubmit }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-5"
    >
      {/* Title */}
      <div className="relative">
        <input
          type="text"
          name="title"
          id="title"
          value={form.title}
          onChange={onChange}
          placeholder=" "
          required
          className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label
          htmlFor="title"
          className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
        >
          Task Title
        </label>
      </div>

      {/* Due Date */}
      <div className="relative">
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={form.dueDate}
          onChange={onChange}
          placeholder=" "
          required
          className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label
          htmlFor="dueDate"
          className="absolute left-4 top-2 text-sm text-gray-500 transition-all peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-600"
        >
          Due Date
        </label>
      </div>

      {/* Priority */}
      <div className="relative">
        <select
          name="priority"
          id="priority"
          value={form.priority}
          onChange={onChange}
          className="peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <label
          htmlFor="priority"
          className="absolute left-4 top-2 text-sm text-gray-500 peer-focus:text-sm peer-focus:text-blue-600"
        >
          Priority
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
