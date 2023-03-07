import { useStore } from 'App/stores/store';
import UserProfileActivityCard from 'Features/profiles/UserProfileActivityCard';
import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useEffect } from 'react';
import {
    CardGroup,
    Grid,
    Header, Tab,
    TabProps
} from 'semantic-ui-react';

function UserProfileActivities() {
  const {
    userProfileStore: {
      loadingUserActivities,
      loadUserActivities,
      profile,
      userActivities,
    },
  } = useStore();

  const panes = [
    {
      menuItem: 'Future Events',
      pane: { key: 'future' },
    },
    {
      menuItem: 'Past Events',
      pane: { key: 'past' },
    },
    {
      menuItem: 'Hosting',
      pane: { key: 'hosting' },
    },
  ];

  useEffect(() => {
    loadUserActivities(profile!.userName);
  }, [loadUserActivities, profile]);

  const handleTabChange = (e: SyntheticEvent, data: TabProps) => {
    loadUserActivities(
      profile!.userName,
      panes[data.activeIndex as number].pane.key
    );
  };

  return (
    <Tab.Pane loading={loadingUserActivities}>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='calendar' content='Activities' />
        </Grid.Column>
        <Grid.Column width={16}>
          <Tab
            menu={{ secondary: true, pointing: true }}
            panes={panes}
            onTabChange={(e, data) => handleTabChange(e, data)}
          />
          <br />
          <CardGroup itemsPerRow={4}>
            {userActivities.map((u) => (
              <UserProfileActivityCard key={u.id} userActivity={u} />
            ))}
          </CardGroup>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(UserProfileActivities);
