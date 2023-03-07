import { UserProfile } from 'App/models/interfaces/profile';
import { useStore } from 'App/stores/store';
import UserProfileAbout from 'Features/profiles/UserProfileAbout';
import UserProfileActivities from 'Features/profiles/UserProfileActivities';
import UserProfileFollowings from 'Features/profiles/UserProfileFollowings';
import UserProfilePhotos from 'Features/profiles/UserProfilePhotos';
import { observer } from 'mobx-react-lite';
import { Tab } from 'semantic-ui-react';

export interface Props {
  profile: UserProfile;
}

function UserProfileContent(props: Props) {
  const { profile } = props;
  const { userProfileStore } = useStore();
  const panes = [
    { menuItem: 'About', render: () => <UserProfileAbout /> },
    {
      menuItem: 'Photos',
      render: () => <UserProfilePhotos profile={profile} />,
    },
    { menuItem: 'Events', render: () => <UserProfileActivities /> },
    {
      menuItem: 'Followers',
      render: () => <UserProfileFollowings />,
    },
    {
      menuItem: 'Following',
      render: () => <UserProfileFollowings />,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      onTabChange={(e, data) => userProfileStore.setActiveTab(data.activeIndex)}
    />
  );
}

export default observer(UserProfileContent);
