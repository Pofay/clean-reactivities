import { UserProfile } from 'App/models/interfaces/profile';
import UserProfileAbout from 'Features/profiles/UserProfileAbout';
import UserProfilePhotos from 'Features/profiles/UserProfilePhotos';
import { observer } from 'mobx-react-lite';
import { Tab } from 'semantic-ui-react';

export interface Props {
  profile: UserProfile;
}

function UserProfileContent(props: Props) {
  const { profile } = props;
  const panes = [
    { menuItem: 'About', render: () => <UserProfileAbout profile={profile} /> },
    {
      menuItem: 'Photos',
      render: () => <UserProfilePhotos profile={profile} />,
    },
    { menuItem: 'Events', render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: 'Followers',
      render: () => <Tab.Pane>Followers Content</Tab.Pane>,
    },
    {
      menuItem: 'Following',
      render: () => <Tab.Pane>Following Content</Tab.Pane>,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
    />
  );
}

export default observer(UserProfileContent);
