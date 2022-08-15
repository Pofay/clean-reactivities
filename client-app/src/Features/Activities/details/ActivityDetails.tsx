import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Image, Card, Button } from 'semantic-ui-react';
import LoadingComponent from '../../../App/Layout/LoadingComponent';
import { useStore } from '../../../App/stores/store';

function ActivityDetails() {
  const { activityStore } = useStore();
  const { id } = useParams<{ id: string }>();
  const { selectedActivity: activity } = activityStore;

  useEffect(() => {
    if (id) activityStore.loadActivity(id);
  }, [id, activityStore]);

  if (!activity)
    return <LoadingComponent content='Loading Specific Activity' />;

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date.toString()}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button
            as={Link}
            to={`/activities/manage/${activity.id}`}
            basic
            color='blue'
            content='Edit'
          />
          <Button
            as={Link}
            to='/activities'
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);
