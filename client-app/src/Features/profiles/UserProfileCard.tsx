import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { UserProfile } from '../../App/models/interfaces/profile';

interface Props {
  profile: UserProfile;
}
function UserProfileCard(props: Props) {
  const { profile } = props;
  return (
    <Card as={Link} to={`/profiles/${profile.userName}`}>
      <Image src={profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>{profile.bio}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name='user' />
        20 followers
      </Card.Content>
    </Card>
  );
}

export default observer(UserProfileCard);
