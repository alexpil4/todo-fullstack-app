import { useState, useEffect } from 'react';

import { Fab, CircularProgress, Backdrop, Tooltip, Box } from '@mui/material';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

import { TaskItem, TaskItemToAdd, TaskItemToEdit } from '../../types/task';
import TasksTable from '../../components/TasksTable';
import TaskSection from '../../components/TaskSection';

interface ShowTask {
  show: boolean;
  task?: TaskItem;
}

const showTaskInitialState = {
  show: false,
};

export default function TaskListPage() {
  // Internal state
  const [taskList, setTaskList] = useState<TaskItem[]>([]);
  const [showTask, setShowTask] = useState<ShowTask>(showTaskInitialState);
  const [loading, setLoading] = useState<boolean>(false);

  // GET tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`);
      if (!response.ok) throw new Error('Error fetching tasks');

      const tasks = await response.json();
      setTaskList(tasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (task: TaskItemToAdd) => {
    setLoading(true);
    // POST task
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/add-task`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // If task is successfully added, add it to the state
        setTaskList((prevList) => [...prevList, data]);
        setShowTask(showTaskInitialState);
      } else {
        // If error occurs, show the error message
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error posting task:', error);
    }
    setLoading(false);
  };

  // EDIT task
  const editTask = async (task: TaskItemToEdit) => {
    const { _id } = task;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/edit-task`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(task),
        },
      );

      const data = await response.json();

      if (response.ok) {
        // If task is successfully updated, delete the old one and
        //  add the new one to the state
        setTaskList((prevList) =>
          prevList.map((prevTask) =>
            prevTask._id === data._id ? data : prevTask,
          ),
        );
        setShowTask(showTaskInitialState);
      } else {
        console.error('Error updating task');
      }
    } catch (error) {
      console.error(
        `Error fetching the update for selected task ${_id}`,
        error,
      );
    }
  };

  // DELETE task
  const deleteTask = async (id: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/delete-task`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ _id: id }),
        },
      );
      if (response.ok) {
        setTaskList((prevTasks) => prevTasks.filter((task) => task._id !== id));
      } else {
        console.error('Error deleting task');
      }
    } catch (error) {
      console.error(`Error fetching the delete for selected task ${id}`, error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCancel = () => setShowTask(showTaskInitialState);

  const showTaskSection = (task?: TaskItem) => {
    // UPDATE TASK
    if (task) setShowTask({ task, show: true });
    // CREATE TASK
    else setShowTask({ show: true });
  };

  if (loading && !taskList)
    return (
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );

  return (
    <>
      {taskList.length === 0 && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="50vh"
        >
          Ops, still not task here!
        </Box>
      )}
      <TaskSection
        submit={handleSubmit}
        editTask={editTask}
        isOpen={showTask.show}
        task={showTask.task}
        handleClose={handleCancel}
      />

      {taskList.length > 0 && (
        <TasksTable
          tasks={taskList}
          handleDone={editTask}
          handleDeleteTask={deleteTask}
          handleEditTask={(task) => showTaskSection(task)}
        />
      )}

      {!showTask.show && (
        <Tooltip title="Write a new task">
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => showTaskSection()}
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
