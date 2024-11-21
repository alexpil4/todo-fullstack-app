import { useState, useEffect } from 'react';
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
  MenuItem,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';

import moment, { Moment } from 'moment';

import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import { TaskItem, TaskItemToAdd, TaskItemToEdit } from '../../types/task';

interface Props {
  submit: (formData: TaskItemToAdd) => void;
  editTask: (formData: TaskItemToEdit) => void;
  handleClose: () => void;
  isOpen: boolean;
  task?: TaskItem;
}

const formInitialState = {
  description: '',
  priority: '',
  completed: false,
  fromTime: '',
  toTime: '',
};

const formInitialErrorState = {
  description: false,
  priority: false,
};

export default function TaskSection(props: Props) {
  const { submit, editTask, handleClose, isOpen, task } = props;

  // Component states
  const [formData, setFormData] = useState(formInitialState);
  const [formError, setFormError] = useState(formInitialErrorState);

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  // Validation checker (*Required)
  const handleValidation = (name: string, value: string) => {
    setFormError((prevFormData) => ({
      ...prevFormData,
      [name]: value.length === 0,
    }));
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

  const handleTimeChange = (value: Moment | null, name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value ? value.format('HH:mm') : null,
    }));
  };

  // Submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // UPDATE
    if (task) editTask({ ...formData, _id: task._id });
    // CREATE
    else submit(formData);
  };

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
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
    <Drawer
      variant="temporary"
      anchor="right"
      open={isOpen}
      onClose={toggleDrawer('right', false)}
    >
      <Toolbar />
      <Divider />
      <Box sx={{ width: 500, padding: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{`${!task ? 'CREATE' : 'UPDATE'} TASK`}</Typography>
          <IconButton size="large" onClick={() => close()}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Grid2
          container
          spacing={2}
          component="form"
          onSubmit={handleSubmit}
          mt={4}
          size={12}
        >
          <Grid2 size={6}>
            <TimePicker
              label="From"
              name="fromTime"
              onChange={(value) => handleTimeChange(value, 'fromTime')}
              value={
                formData.fromTime ? moment(formData.fromTime, 'HH:mm') : null
              }
            />
          </Grid2>
          <Grid2 size={6}>
            <TimePicker
              label="To"
              name="toTime"
              onChange={(value) => handleTimeChange(value, 'toTime')}
              value={formData.toTime ? moment(formData.toTime, 'HH:mm') : null}
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

          <Grid2 size={12}>
            <TextField
              select
              required
              fullWidth
              id="outlined-basic"
              label="Priority"
              name="priority"
              error={formError.priority}
              helperText={formError.priority && 'Required field'}
              variant="outlined"
              value={formData.priority}
              onChange={handleChange}
            >
              <MenuItem value="low">LOW</MenuItem>
              <MenuItem value="medium">MEDIUM</MenuItem>
              <MenuItem value="high">HIGH</MenuItem>
            </TextField>
          </Grid2>

          <FormControlLabel
            control={
              <Checkbox
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
              />
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
