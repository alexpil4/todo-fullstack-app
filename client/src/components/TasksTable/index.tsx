import { TaskItem } from '../../types/task';
import moment from 'moment';

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
  ButtonBase,
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  tasks: TaskItem[];
  handleEditTask: (task: TaskItem) => void;
  handleDeleteTask: (id: string) => void;
}

export default function TasksTable(props: Props) {
  const { tasks, handleDeleteTask, handleEditTask } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>DATE - TIME</TableCell>
            <TableCell>TITLE</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>STATUS</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task: TaskItem) => (
            <ButtonBase
              key={task._id}
              component={TableRow}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                display: 'table-row',
                ':hover': {
                  backgroundColor: task.completed
                    ? 'var(--mui-palette-warning-light)'
                    : 'var(--mui-palette-success-light)',
                  cursor: 'pointer',
                },
              }}
            >
              <TableCell>
                {moment(task.timestamp).format('DD.MM.YYYY - HH:mm')}
              </TableCell>
              <TableCell component="th" scope="task">
                {task.title}
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {task.completed ? (
                  <Chip
                    size="small"
                    icon={<ThumbUpAltIcon />}
                    label="COMPLETE"
                    color="success"
                  />
                ) : (
                  <Chip
                    size="small"
                    icon={<HourglassBottomIcon />}
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
            </ButtonBase>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
