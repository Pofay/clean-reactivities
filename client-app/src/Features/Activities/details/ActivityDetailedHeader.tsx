import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Segment } from 'semantic-ui-react';
import { DateFormatter } from '../../../App/common/utils/date-formatter';
import { Activity } from '../../../App/models/interfaces/activity';
import { useStore } from '../../../App/stores/store';

const activityImageStyle = {
  filter: 'brightness(30%)',
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
};

interface Props {
  activity: Activity;
}

export default observer(function ActivityDetailedHeader({ activity }: Props) {
  const {
    activityStore: { updateAttendance, loading },
  } = useStore();

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={activity.title}
                  style={{ color: 'white' }}
                />
                <p>{DateFormatter.formatDateTime(activity.date!)}</p>
                <p>
                  Hosted by{' '}
                  <Link to={`/profiles/${activity.host?.userName}`}>
                    <strong>{activity.host?.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {activity.isHost ? (
          <Button
            as={Link}
            to={`/activities/manage/${activity.id}`}
            color='orange'
            floated='right'
          >
            Manage Event
          </Button>
        ) : activity.isGoing ? (
          <Button onClick={updateAttendance} loading={loading}>
            Cancel attendance
          </Button>
        ) : (
          <Button onClick={updateAttendance} color='teal' loading={loading}>
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
