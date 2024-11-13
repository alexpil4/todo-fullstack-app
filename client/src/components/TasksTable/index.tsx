import { TaskItem } from '../../types/components';
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
} from '@mui/material';

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  tasks: TaskItem[];
  handleDeleteTask: (id: string) => void;
}

export default function TasksTable(props: Props) {
  const { tasks, handleDeleteTask } = props;

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
            <TableRow key={task._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{moment(task.timestamp).format('DD.MM.YYYY - HH:mm')}</TableCell>
              <TableCell component="th" scope="task">
                {task.title}
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {task.completed ? (
                  <Chip size="small" icon={<ThumbUpAltIcon />} label="COMPLETE" color="success" />
                ) : (
                  <Chip
                    size="small"
                    icon={<HourglassBottomIcon />}
                    label="ON HOLD"
                    color="warning"
                  />
                )}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleDeleteTask(task._id)} aria-label="delete">
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
