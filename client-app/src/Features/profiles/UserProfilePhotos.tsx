import PhotoUploadWidget from 'App/common/imageUpload/PhotoUploadWidget';
import { Images } from 'App/common/utils/images';
import { Photo, UserProfile } from 'App/models/interfaces/profile';
import { useStore } from 'App/stores/store';
import { observer } from 'mobx-react-lite';
import { SyntheticEvent, useState } from 'react';
import { Button, Card, Grid, Header, Image, Tab } from 'semantic-ui-react';

export interface Props {
  profile: UserProfile;
}

function UserProfilePhotos(props: Props) {
  const { profile } = props;
  const {
    userProfileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      setMainPhoto,
      loading,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };

  const handleSetMainPhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
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
                  {isCurrentUser && (
                    <Button.Group fluid widths={2}>
                      <Button
                        basic
                        color='green'
                        content='Main'
                        name={photo.id}
                        disabled={photo.isMain}
                        loading={target === photo.id && loading}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                      />
                      <Button basic color='red' icon='trash' />
                    </Button.Group>
                  )}
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
