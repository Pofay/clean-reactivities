import { UserProfile } from 'App/models/interfaces/profile';
import { useStore } from 'App/stores/store';
import { observer } from 'mobx-react-lite';
import { SyntheticEvent } from 'react';
import { Reveal, Button } from 'semantic-ui-react';

interface Props {
  profile: UserProfile;
}
function UserProfileFollowButton(props: Props) {
  const { profile } = props;
  const { userProfileStore, userStore } = useStore();
  const { updateFollowing, loading } = userProfileStore;

  if (userStore.user?.userName === profile.userName) return null;

  const handleFollow = (e: SyntheticEvent, userName: string) => {
    e.preventDefault();
    profile.following
      ? updateFollowing(userName, false)
      : updateFollowing(userName, true);
  };

  return (
    <Reveal animated='move'>
      <Reveal.Content visible style={{ width: '100%' }}>
        <Button
          fluid
          color='teal'
          content={profile.following ? 'Following' : 'Not Following'}
        />
      </Reveal.Content>
      <Reveal.Content hidden>
        <Button
          loading={loading}
          fluid
          basic
          color={profile.following ? 'red' : 'green'}
          content={profile.following ? 'Unfollow' : 'Follow'}
          onClick={(e) => handleFollow(e, profile.userName)}
        />
      </Reveal.Content>
    </Reveal>
  );
}

export default observer(UserProfileFollowButton);
