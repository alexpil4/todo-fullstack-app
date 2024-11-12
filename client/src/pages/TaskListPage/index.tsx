import { useState, useEffect } from 'react';

import { Fab, CircularProgress, Backdrop, Tooltip } from '@mui/material';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { TaskItem, TaskItemToAdd } from './../../types/components';
import TasksTable from '../../components/TasksTable';
import TaskCreation from '../../components/TaskCreation';

export default function TaskListPage() {
  // Internal state
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [showTaskCreation, setShowTaskCreation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
    setLoading(true);
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
    setLoading(false);
  };

  const handleCancel = () => setShowTaskCreation(false);

  const addNewTask = () => {
    setShowTaskCreation(true);
  };

  if (loading)
    return (
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      <TaskCreation submit={handleSubmit} isOpen={showTaskCreation} handleClose={handleCancel} />

      {taskList.length > 0 && <TasksTable tasks={taskList} />}

      {!showTaskCreation && (
        <Tooltip title="Write a new task">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => addNewTask()}
            style={{
              position: 'fixed',
              bottom: '40px',
              right: '40px',
              zIndex: 1000,
            }}
          >
            <PlaylistAddIcon />
          </Fab>
        </Tooltip>
      )}
    </>
  );
}
