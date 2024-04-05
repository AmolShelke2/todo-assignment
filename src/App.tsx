import React, { useState } from 'react';

type Priority = 'p1' | 'p2' | 'p3';

type Task = {
  id: number;
  title: string;
  isCompleted: boolean;
  priority?: Priority;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Learn React',
      isCompleted: true,
      priority: 'p1',
    },
  ]);

  const [taskName, setTaskName] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const onAddTask = () => {
    if (taskName === '') {
      alert('Cannot add an empty task');
      return;
    }

    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        title: taskName,
        isCompleted: false,
      },
    ]);
    setTaskName('');
  };

  const onDeleteTask = (id: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  const onEditTask = (id: number) => {
    setIsEditing(true);
    setEditingTaskId(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setTaskName(taskToEdit.title);
    }
  };

  const onSaveEdit = () => {
    if (editingTaskId !== null) {
      const updatedTasks = tasks.map((task) =>
        task.id === editingTaskId ? { ...task, title: taskName } : task,
      );
      setTasks(updatedTasks);
      setIsEditing(false);
      setEditingTaskId(null);
      setTaskName('');
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      <label htmlFor="task-input">Add Task: </label>
      <input
        id="task-input"
        value={isEditing ? '' : taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={onAddTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className="task-card" data-testid="task">
            {isEditing && editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  data-testid="Edit Task"
                />
                <button onClick={onSaveEdit}>Save</button>
              </div>
            ) : (
              <p>{task.title}</p>
            )}
            <div className="option-btns">
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
              <button onClick={() => onEditTask(task.id)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
