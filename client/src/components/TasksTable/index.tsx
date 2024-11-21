import { TaskItem } from '../../types/task';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

interface Props {
  tasks: TaskItem[];
  handleDone: (task: TaskItem) => void;
  handleEditTask: (task: TaskItem) => void;
  handleDeleteTask: (id: string) => void;
}

export default function TasksTable(props: Props) {
  const { tasks, handleDeleteTask, handleEditTask, handleDone } = props;

  const handlePriority = (value: string) => {
    let color: 'error' | 'warning' | 'success' | 'primary' = 'primary';

    switch (value) {
      case 'high':
        color = 'error';
        break;
      case 'medium':
        color = 'warning';
        break;
      case 'low':
        color = 'primary';
        break;
      default:
        color = 'primary';
    }

    return (
      <Tooltip title={`${value} priority `}>
        <ErrorOutlineOutlinedIcon color={color} />
      </Tooltip>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          {tasks.map((task: TaskItem) => (
            <TableRow
              key={task._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <Tooltip title="time slot">
                <TableCell>
                  <Typography color="primary">
                    {task.fromTime} - {task.toTime}
                  </Typography>
                </TableCell>
              </Tooltip>
              <Tooltip title="task description">
                <TableCell>{task.description}</TableCell>
              </Tooltip>
              <TableCell>{handlePriority(task.priority)}</TableCell>
              <TableCell>
                {task.completed ? (
                  <Chip
                    label="Completed"
                    onDelete={() => console.log('d')}
                    deleteIcon={<CelebrationOutlinedIcon />}
                    color="success"
                  />
                ) : (
                  <Chip
                    label="Pending"
                    onClick={() => handleDone({ ...task, completed: true })}
                    onDelete={() => console.log('Completed')}
                    deleteIcon={<DoneIcon />}
                    variant="outlined"
                  />
                )}
              </TableCell>

              <TableCell align="right">
                <IconButton
                  onClick={() => handleEditTask(task)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteTask(task._id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
