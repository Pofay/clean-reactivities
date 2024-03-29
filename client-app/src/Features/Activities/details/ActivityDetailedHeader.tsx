import { DateFormatter } from 'App/common/utils/date-formatter';
import { Images } from 'App/common/utils/images';
import { Activity } from 'App/models/interfaces/activity';
import { useStore } from 'App/stores/store';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Header, Image, Item, Label, Segment } from 'semantic-ui-react';

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
    activityStore: { updateAttendance, loading, cancelActivityToggle },
  } = useStore();

  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        {activity.isCancelled && (
          <Label
            style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
            ribbon
            color='red'
            content='Cancelled'
          />
        )}
        <Image
          src={Images.categoryImage(activity.category)}
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
          <>
            <Button
              color={activity.isCancelled ? 'green' : 'red'}
              floated='left'
              basic
              content={
                activity.isCancelled
                  ? 'Re-activate Activity'
                  : 'Cancel Activity'
              }
              onClick={cancelActivityToggle}
              loading={loading}
            />
            <Button
              disabled={activity.isCancelled}
              as={Link}
              to={`/activities/manage/${activity.id}`}
              color='orange'
              floated='right'
            >
              Manage Event
            </Button>
          </>
        ) : activity.isGoing ? (
          <Button onClick={updateAttendance} loading={loading}>
            Cancel attendance
          </Button>
        ) : (
          <Button
            disabled={activity.isCancelled}
            onClick={updateAttendance}
            color='teal'
            loading={loading}
          >
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
});
