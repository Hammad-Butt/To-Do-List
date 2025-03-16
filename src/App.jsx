import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  useEffect(() => {
    document.title = 'To-Do List App';
  }, []);

  const handleAddTask = () => {
    if (currentTask.trim()) {
      if (isEditing && editTaskId !== null) {
        setTasks(
          tasks.map((task) =>
            task.id === editTaskId ? { ...task, name: currentTask } : task
          )
        );
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        setTasks([...tasks, { id: Date.now(), name: currentTask, completed: false }]);
      }
      setCurrentTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleEditTask = (task) => {
    setCurrentTask(task.name);
    setIsEditing(true);
    setEditTaskId(task.id);
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app-container">
      <h1>To-Do List App</h1>
      <TaskInput
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        handleAddTask={handleAddTask}
        isEditing={isEditing}
      />
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            handleEditTask={handleEditTask}
            handleToggleComplete={handleToggleComplete}
            isEditing={isEditing}
          />
        ))}
      </ul>
    </div>
  );
}

function TaskInput({ currentTask, setCurrentTask, handleAddTask, isEditing }) {
  return (
    <div className="task-input">
      <input
        type="text"
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
        placeholder="Enter a task"
      />
      <button className={isEditing ? 'edit-mode' : 'add-mode'} onClick={handleAddTask}>
        {isEditing ? 'Update Task' : 'Add Task'}
      </button>
    </div>
  );
}

function TaskItem({ task, handleDeleteTask, handleEditTask, handleToggleComplete, isEditing }) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <span onClick={() => handleToggleComplete(task.id)}>{task.name}</span>
      <div className="task-actions">
        <button className={`edit ${isEditing ? 'active' : ''}`} onClick={() => handleEditTask(task)}>
          Edit
        </button>
        <button className="delete" onClick={() => handleDeleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default App;
