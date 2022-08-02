import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  if (!activity) return <LoadingComponent content="Loading Specific Activity"/>

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
          <Button basic color='blue' content='Edit' onClick={handleClick} />
          <Button basic color='grey' content='Cancel' onClick={handleCancel} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(ActivityDetails);
