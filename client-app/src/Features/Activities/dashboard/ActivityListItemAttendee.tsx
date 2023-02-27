import { Images } from 'App/common/utils/images';
import { UserProfile } from 'App/models/interfaces/profile';
import UserProfileCard from 'Features/profiles/UserProfileCard';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { List, Image, Popup } from 'semantic-ui-react';

interface Props {
  attendees: UserProfile[];
}

function ActivityListItemAttendee(props: Props) {
  const styles = {
    borderColor: 'orange',
    borderWidth: 2,
  };
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
                bordered
                style={attendee.following ? styles : null}
                src={attendee.image || Images.baseUserImage}
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
