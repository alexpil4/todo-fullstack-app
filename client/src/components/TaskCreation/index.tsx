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
  Grid2,
} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { TaskItemToAdd } from '../../types/components';

const formInitialState = {
  title: '',
  description: '',
  completed: false,
};

const formInitialErrorState = {
  title: false,
  description: false,
};

export default function TaskCreation(props: {
  submit: (formData: TaskItemToAdd) => void;
  handleClose: () => void;
  isOpen: boolean;
}) {
  const { submit, handleClose, isOpen } = props;

  // Internal state
  const [formData, setFormData] = useState(formInitialState);
  const [formError, setFormError] = useState(formInitialErrorState);

  // Validation checker (*Required)
  const handleValidation = (name: string, value: string) => {
    setFormError((prevFormData) => ({ ...prevFormData, [name]: value.length === 0 }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    // Handle the validation
    handleValidation(name, value);
    // Form state update
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Submit
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
      setFormError(formInitialErrorState);
    };

  // Close component and reset form
  const close = () => {
    handleClose();
    setFormData(formInitialState);
  };

  return (
    <Drawer variant="temporary" anchor="right" open={isOpen} onClose={toggleDrawer('right', false)}>
      <Toolbar />
      <Divider />
      <Box sx={{ width: 500, padding: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">CREATE A TASK</Typography>
          <IconButton size="large" onClick={() => close()}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid2
          container
          component="form"
          onSubmit={handleSubmit}
          sx={{ '& > :not(style)': { m: 1 } }}
          mt={4}
        >
          <Grid2 size={12}>
            <TextField
              required
              fullWidth
              id="outlined-basic"
              label="Title"
              name="title"
              error={formError.title}
              helperText={formError.title && 'Required field'}
              variant="outlined"
              value={formData.title}
              onChange={handleChange}
            />
          </Grid2>
          <Grid2 size={12}>
            <TextField
              required
              fullWidth
              multiline
              rows={2}
              id="outlined-basic"
              label="Description"
              name="description"
              error={formError.description}
              helperText={formError.description && 'Required field'}
              variant="outlined"
              value={formData.description}
              onChange={handleChange}
            />
          </Grid2>

          <FormControlLabel
            control={
              <Checkbox name="completed" checked={formData.completed} onChange={handleChange} />
            }
            label="Already completed"
          />
        </Grid2>
      </Box>
      <Box>
        {isOpen && (
          <Tooltip title="Save the new task">
            <Fab
              color="success"
              aria-label="add"
              onClick={handleSubmit}
              style={{
                position: 'fixed',
                bottom: '40px',
                right: '40px',
                zIndex: 1000,
              }}
            >
              <SaveIcon />
            </Fab>
          </Tooltip>
        )}
      </Box>
    </Drawer>
  );
}
