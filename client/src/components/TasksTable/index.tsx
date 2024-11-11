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
} from '@mui/material';

import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

interface Props {
  tasks: TaskItem[];
}

export default function TasksTable(props: Props) {
  const { tasks } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>TIME</TableCell>
            <TableCell>TITLE</TableCell>
            <TableCell>DESCRIPTION</TableCell>
            <TableCell>STATUS</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task: TaskItem) => (
            <TableRow key={task.title} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{moment(task.timestamp).format('DD.MM.YYYY HH:mm')}</TableCell>
              <TableCell component="th" scope="task">
                {task.title}
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>
                {task.completed ? (
                  <Chip icon={<ThumbUpAltIcon />} label="COMPLETE" color="success" />
                ) : (
                  <Chip icon={<HourglassBottomIcon />} label="ON HOLD" color="warning" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
