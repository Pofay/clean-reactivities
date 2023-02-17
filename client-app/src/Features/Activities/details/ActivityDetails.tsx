import LoadingComponent from 'App/Layout/LoadingComponent';
import { useStore } from 'App/stores/store';
import ActivityDetailedChat from 'Features/Activities/details/ActivityDetailedChat';
import ActivityDetailedHeader from 'Features/Activities/details/ActivityDetailedHeader';
import ActivityDetailedInfo from 'Features/Activities/details/ActivityDetailedInfo';
import ActivityDetailedSidebar from 'Features/Activities/details/ActivityDetailedSidebar';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

function ActivityDetails() {
  const { activityStore } = useStore();
  const { id } = useParams<{ id: string }>();
  const {
    selectedActivity: activity,
    loadActivity,
    loadingInitial,
    deselectActivity,
  } = activityStore;

  useEffect(() => {
    if (id) {
      loadActivity(id);
      console.log('Loading');
    }
    return () => deselectActivity();
  }, [id, loadActivity, deselectActivity]);

  if (loadingInitial || !activity)
    return <LoadingComponent content='Loading Specific Activity' />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat activity={activity} />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity} />
      </Grid.Column>
    </Grid>
  );
}

export default observer(ActivityDetails);
