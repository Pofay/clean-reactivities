import { Activity } from 'App/models/interfaces/activity';
import { useStore } from 'App/stores/store';
import ActivityFilters from 'Features/Activities/dashboard/ActivityFilters';
import ActivityListItem from 'Features/Activities/dashboard/ActivityListItem';
import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Grid, Header } from 'semantic-ui-react';

function ActivityList() {
  const { activityStore } = useStore();
  const { groupedActivities } = activityStore;

  return (
    <Grid>
      <Grid.Column width='10'>
        {groupedActivities.map(([group, activities]) => (
          <Fragment key={group}>
            <Header sub color='teal'>
              {group}
            </Header>
            {activities.map((a: Activity) => (
              <ActivityListItem key={a.id} activity={a} />
            ))}
          </Fragment>
        ))}
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityList);
