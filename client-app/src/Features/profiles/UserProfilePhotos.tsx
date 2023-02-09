import PhotoUploadWidget from 'App/common/imageUpload/PhotoUploadWidget';
import { Images } from 'App/common/utils/images';
import { UserProfile } from 'App/models/interfaces/profile';
import { useStore } from 'App/stores/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';

export interface Props {
  profile: UserProfile;
}

function UserProfilePhotos(props: Props) {
  const { profile } = props;
  const {
    userProfileStore: { isCurrentUser, uploadPhoto, uploading },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header floated='left' icon='image' content='Photos' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              uploadPhoto={handlePhotoUpload}
              loading={uploading}
            />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                </Card>
              ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(UserProfilePhotos);
