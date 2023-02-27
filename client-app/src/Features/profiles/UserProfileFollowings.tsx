import { useStore } from 'App/stores/store';
import UserProfileCard from 'Features/profiles/UserProfileCard';
import { observer } from 'mobx-react-lite';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';

function UserProfileFollowings() {
  const { userProfileStore } = useStore();
  const { profile, followings, loadingFollowings, activeTab } =
    userProfileStore;

  return (
    <Tab.Pane loading={loadingFollowings}>
      <Grid>
        <Grid.Column width={15}>
          <Header
            floated='left'
            icon='user'
            content={
              activeTab === 3
                ? `People following ${profile?.displayName}`
                : `People ${profile?.displayName} is following`
            }
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Card.Group itemsPerRow={4}>
            {followings.map((p) => (
              <UserProfileCard key={p.userName} profile={p} />
            ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(UserProfileFollowings);
