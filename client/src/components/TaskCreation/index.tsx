import { useState } from 'react';
import {
  Drawer,
  Toolbar,
  Divider,
  Box,
  TextField,
  Checkbox,
  IconButton,
  Typography,
  Tooltip,
  FormControlLabel,
  Fab,
} from '@mui/material';

import AddTaskIcon from '@mui/icons-material/AddTask';

import CloseIcon from '@mui/icons-material/Close';

import { TaskItemToAdd } from '../../types/components';

const formInitialState = {
  title: '',
  description: '',
  completed: false,
};

export default function TaskCreation(props: {
  submit: (formData: TaskItemToAdd) => void;
  handleClose: () => void;
  isOpen: boolean;
}) {
  const { submit, handleClose, isOpen } = props;

  // Local state
  const [formData, setFormData] = useState(formInitialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    // Form state update
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submit(formData);
  };

  const toggleDrawer =
    (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      // Close component
      handleClose();
      // Reset form
      setFormData(formInitialState);
    };

  // Close component and reset form
  const close = () => {
    handleClose();
    setFormData(formInitialState);
  };

  return (
    <Drawer variant="temporary" anchor="right" open={isOpen} onClose={toggleDrawer('right', false)}>
      <>
        <Toolbar />
        <Divider />
        <Box sx={{ padding: 2 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">CREATE A TASK</Typography>
            <IconButton size="large" onClick={() => close()}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ '& > :not(style)': { m: 1 } }}
            noValidate
            autoComplete="off"
            mt={4}
          >
            <TextField
              id="outlined-basic"
              label="Title"
              name="title"
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
            />

            <TextField
              id="outlined-basic"
              label="Description"
              name="description"
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
            />

            <FormControlLabel
              control={
                <Checkbox name="completed" checked={formData.completed} onChange={handleChange} />
              }
              label="Already completed"
            />
          </Box>
        </Box>
        <Box>
          {isOpen && (
            <Tooltip title="Set the new task">
              <Fab
                color="primary"
                aria-label="add"
                onClick={handleSubmit}
                style={{
                  position: 'fixed',
                  bottom: '40px',
                  right: '40px',
                  zIndex: 1000,
                }}
              >
                <AddTaskIcon />
              </Fab>
            </Tooltip>
          )}
        </Box>
      </>
    </Drawer>
  );
}
