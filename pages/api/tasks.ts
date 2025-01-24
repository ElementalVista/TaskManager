import type { NextApiRequest, NextApiResponse } from 'next';

// Define the type for a task
interface Task {
  id: number;
  name: string;
}

let tasks: Task[] = []; // Use Task[] to type the tasks array

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'GET':
      res.status(200).json(tasks);
      break;
    case 'POST':
      const newTask: Task = { id: Date.now(), ...req.body }; // Ensure newTask matches Task type
      tasks.push(newTask);
      res.status(201).json(newTask);
      break;
    case 'PUT':
      const { id, ...updatedTask } = req.body;
      tasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      res.status(200).json({ success: true });
      break;
    case 'DELETE':
      const { taskId } = req.query;
      tasks = tasks.filter((task) => task.id !== parseInt(taskId as string, 10));
      res.status(200).json({ success: true });
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}