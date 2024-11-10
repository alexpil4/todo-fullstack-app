import { useState } from 'react';

import { TaskItemToAdd } from './../../types/components';

export default function TaskToAdd(props: {
  submit: (formData: TaskItemToAdd) => void;
  cancel: () => void;
}) {
  const { cancel, submit } = props;

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

  return (
    <div>
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
      <button onClick={() => cancel()}>Cancel</button>
    </div>
  );
}
