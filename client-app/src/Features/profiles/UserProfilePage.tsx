import LoadingComponent from 'App/Layout/LoadingComponent';
import { useStore } from 'App/stores/store';
import UserProfileContent from 'Features/profiles/UserProfileContent';
import UserProfileHeader from 'Features/profiles/UserProfileHeader';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { userProfileStore } = useStore();

  const { loadingProfile, loadProfile, profile } = userProfileStore;

  useEffect(() => {
    if (username) loadProfile(username);
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent content='Loading profile...' />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && <UserProfileHeader profile={profile} />}
        <UserProfileContent />
      </Grid.Column>
    </Grid>
  );
}

export default observer(UserProfilePage);
