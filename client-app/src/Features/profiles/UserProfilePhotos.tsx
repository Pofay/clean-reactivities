import { Images } from 'App/common/utils/images';
import { UserProfile } from 'App/models/interfaces/profile';
import { observer } from 'mobx-react-lite';
import { Card, Header, Image, Tab } from 'semantic-ui-react';

export interface Props {
  profile: UserProfile;
}

function UserProfilePhotos(props: Props) {
  const { profile } = props;
  return (
    <Tab.Pane>
      <Header icon='image' content='Photos' />
      <Card.Group itemsPerRow={5}>
        {profile.photos?.map((photo) => (
          <Card key={photo.id}>
            <Image src={photo.url} />
          </Card>
        ))}
      </Card.Group>
    </Tab.Pane>
  );
}

export default observer(UserProfilePhotos);
