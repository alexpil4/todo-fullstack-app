import { TaskItem } from './../../types/components';
import moment from 'moment';

interface Props {
  data: TaskItem;
}

export default function Task(props: Props) {
  const { title, description, completed, timestamp } = props.data;

  return (
    <div>
      {title} | {description} | {completed ? 'completed' : 'todo'} |{' '}
      {moment(timestamp).format('DD.MM.YYYY HH:mm')}
    </div>
  );
}
