import { useState, useEffect } from 'react';

// Define the type for the task
interface Task {
  id: number;
  name: string;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]); // Add Task[] type to the tasks state
  const [newTask, setNewTask] = useState<string>(''); // Specify the newTask type as string

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  // Add a new task
  const addTask = async () => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newTask }), // Pass the correct body structure
    });
    const task: Task = await res.json(); // Explicitly define task type
    setTasks([...tasks, task]);
    setNewTask('');
  };

  // Delete a task
  const deleteTask = async (id: number) => { // Ensure id is treated as a number
    await fetch(`/api/tasks?taskId=${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Enter a new task"
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-2 bg-white mb-2 rounded shadow"
          >
            <span className="flex-grow">{task.name}</span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:underline ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;