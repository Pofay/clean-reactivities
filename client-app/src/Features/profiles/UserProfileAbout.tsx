import {
  UserProfile,
  UserProfileFormValues,
} from 'App/models/interfaces/profile';
import { useStore } from 'App/stores/store';
import UserProfileForm from 'Features/profiles/form/UserProfileEditForm';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Grid, Header, Tab } from 'semantic-ui-react';

const mapToFormValues = (profile: UserProfile): UserProfileFormValues => {
  return {
    bio: profile.bio,
    displayName: profile.displayName,
  };
};

function UserProfileAbout() {
  const {
    userProfileStore: { isCurrentUser, updateProfile, profile },
  } = useStore();

  const [editMode, setEditMode] = useState(false);

  const [formValues, setFormValues] = useState<UserProfileFormValues>({
    displayName: '',
    bio: '',
  });

  useEffect(() => {
    if (profile) {
      setFormValues(mapToFormValues(profile));
    }
  }, [profile]);

  const handleFormSubmit = (values: UserProfileFormValues) => {
    updateProfile(values).then(() => setEditMode(!editMode));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16}>
          <Header
            floated='left'
            icon='user'
            content={`About ${profile?.displayName}`}
          />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={editMode ? 'Cancel' : 'Edit Profile'}
              onClick={() => setEditMode(!editMode)}
            />
          )}
        </Grid.Column>

        <Grid.Column width={16}>
          {editMode ? (
            <UserProfileForm
              handleSubmit={handleFormSubmit}
              formValues={formValues}
            />
          ) : (
            <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(UserProfileAbout);
