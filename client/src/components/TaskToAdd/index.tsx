import { useState, Fragment } from 'react';
import { Drawer, Toolbar, Divider, Box, TextField, Checkbox } from '@mui/material';

import { TaskItemToAdd } from './../../types/components';

export default function TaskToAdd(props: {
  submit: (formData: TaskItemToAdd) => void;
  handleClose: () => void;
  isOpen: boolean;
}) {
  const { submit, handleClose, isOpen } = props;

  // Local state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

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

      handleClose();
    };

  return (
    <Fragment>
      <Drawer
        variant="temporary"
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer('right', false)}
      >
        <>
          <Toolbar />
          <Divider />
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
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

            <Checkbox aria-label="Checkbox demo" />
          </Box>

          <form onSubmit={handleSubmit}>
            Title: <input type="text" name="title" value={formData.title} onChange={handleChange} />
            <br />
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            <br />
            Completed:
            <input
              type="checkbox"
              name="completed"
              checked={formData.completed}
              onChange={handleChange}
            />
            <br />
            <br />
            <button type="submit">+ Add task</button>
          </form>
          <br />
          <button onClick={() => handleClose()}>Cancel</button>
        </>
      </Drawer>
    </Fragment>
  );
}
