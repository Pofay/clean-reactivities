import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import { UserProfile } from '../../../App/models/interfaces/profile';

interface Props {
  attendees: UserProfile[];
}

function ActivityListItemAttendee(props: Props) {
  return (
    <List horizontal>
      {props.attendees.map((attendee) => (
        <List.Item
          key={attendee.userName}
          as={Link}
          to={`/profiles/${attendee.userName}`}
        >
          <Image
            size='mini'
            circular
            src={attendee.image || '/assets/user.png'}
          ></Image>
        </List.Item>
      ))}
    </List>
  );
}

export default observer(ActivityListItemAttendee);
