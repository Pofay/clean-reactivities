import { UserProfile } from 'App/models/interfaces/profile';
import UserProfileCard from 'Features/profiles/UserProfileCard';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { List, Image, Popup } from 'semantic-ui-react';

interface Props {
  attendees: UserProfile[];
}

function ActivityListItemAttendee(props: Props) {
  return (
    <List horizontal>
      {props.attendees.map((attendee) => (
        <Popup
          hoverable
          key={attendee.userName}
          trigger={
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
          }
        >
          <Popup.Content>
            <UserProfileCard profile={attendee} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
}

export default observer(ActivityListItemAttendee);
