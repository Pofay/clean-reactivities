import { observer } from 'mobx-react-lite';
import { Grid, Item, Segment } from 'semantic-ui-react';
import { Activity } from '../../../App/models/interfaces/activity';
import { useStore } from '../../../App/stores/store';
import AcitivityListItem from './ActivityListItem';

function ActivityList() {
  const { activityStore } = useStore();
  const { loading, activitiesByDate , deleteActivity } = activityStore;

  return (
    <Grid>
      <Grid.Column width='10'>
        <Segment>
          <Item.Group divided>
            {activitiesByDate.map((a: Activity) => (
              <AcitivityListItem
                deleteActivity={deleteActivity}
                loading={loading}
                key={a.id}
                activity={a}
              />
            ))}
          </Item.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityList);
