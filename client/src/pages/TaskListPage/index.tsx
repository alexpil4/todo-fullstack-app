import { useState, useEffect } from 'react';

import { TaskItem, TaskItemToAdd } from './../../types/components';
import Task from '../../components/Task';
import TaskToAdd from '../../components/TaskToAdd';

export default function TaskListPage() {
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [showTaskCreation, setShowTaskCreation] = useState<boolean>(false);

  const fetchTasks = async () => {
    // GET tasks
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      if (!response.ok) throw new Error('Error fetching tasks');

      const tasks = await response.json();
      setTaskList(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (task: TaskItemToAdd) => {
    // POST task
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (response.ok) {
        // If task is successfully added, add it to the state
        setTaskList((prevList) => [...prevList, data]);
        setShowTaskCreation(false);
      } else {
        // If error occurs, show the error message
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error posting task:', error);
    }
  };

  const handleCancel = () => setShowTaskCreation(false);

  const addNewTask = () => {
    setShowTaskCreation(true);
  };

  console.log(taskList);

  return (
    <div>
      {showTaskCreation ? <TaskToAdd submit={handleSubmit} cancel={handleCancel} /> : null}
      {!showTaskCreation &&
        taskList.length > 0 &&
        taskList.map((task) => <Task key={task._id} data={task} />)}
      <br />
      {!showTaskCreation ? <button onClick={() => addNewTask()}>+ add task</button> : null}
    </div>
  );
}
