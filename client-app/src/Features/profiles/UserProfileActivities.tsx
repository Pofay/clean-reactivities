import { useStore } from 'App/stores/store';
import { Grid, Header, Tab } from 'semantic-ui-react';

function UserProfileActivities() {
  const {
    userProfileStore: { loadingUserActivities, loadUserActivites },
  } = useStore();
  const panes = [
    {
      menuItem: 'Future Events',
      render: () => <></>,
    },
    {
      menuItem: 'Past Events',
      render: () => <></>,
    },
    {
      menuItem: 'Hosting',
      render: () => <></>,
    },
  ];

  return (
    <Tab.Pane loading={loadingUserActivities}>
      <Grid>
        <Grid.Column width={15}>
          <Header floated='left' icon='calendar' content='Activities' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default UserProfileActivities;
