import UserProfileHeader from 'Features/profiles/UserProfileHeader';
import { Grid } from 'semantic-ui-react';

function UserProfilePage() {
  return (
    <Grid>
      <Grid.Column width={16}>
        <UserProfileHeader />
      </Grid.Column>
    </Grid>
  );
}

export default UserProfilePage;
