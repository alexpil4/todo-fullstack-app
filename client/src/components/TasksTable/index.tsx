import { TaskItem } from '../../types/task';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import NotificationsPausedIcon from '@mui/icons-material/NotificationsPaused';
import DeleteIcon from '@mui/icons-material/Delete';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';

interface Props {
  tasks: TaskItem[];
  handleEditTask: (task: TaskItem) => void;
  handleDeleteTask: (id: string) => void;
}

export default function TasksTable(props: Props) {
  const { tasks, handleDeleteTask, handleEditTask } = props;

  const handlePriority = (value: string) => {
    let color: 'error' | 'warning' | 'primary' | 'disabled' = 'disabled';

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
        color = 'disabled';
    }

    return (
      <Tooltip title={value}>
        <DirectionsRunIcon color={color} />
      </Tooltip>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TIME SLOT</TableCell>
            <TableCell>TASK</TableCell>
            <TableCell>PRIORITY</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task: TaskItem) => (
            <TableRow
              key={task._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Typography color="primary">
                  {task.fromTime} - {task.toTime}
                </Typography>
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{handlePriority(task.priority)}</TableCell>
              <TableCell>
                {task.completed ? (
                  <Chip
                    size="small"
                    icon={<SentimentSatisfiedAltIcon />}
                    label="COMPLETE"
                    color="success"
                  />
                ) : (
                  <Chip
                    size="small"
                    icon={<NotificationsPausedIcon />}
                    label="ON HOLD"
                    color="warning"
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
