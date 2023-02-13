import ValidatedTextArea from 'App/common/form/ValidatedTextArea';
import ValidatedTextInput from 'App/common/form/ValidatedTextInput';
import {
  UserProfile,
  UserProfileFormValues,
} from 'App/models/interfaces/profile';
import { useStore } from 'App/stores/store';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Button, Form, Grid, GridColumn, Header, Tab } from 'semantic-ui-react';
import * as Yup from 'yup';

const mapToFormValues = (profile: UserProfile): UserProfileFormValues => {
  return {
    bio: profile.bio,
    displayName: profile.displayName,
  };
};

function UserProfileAbout() {
  const {
    userProfileStore: { isCurrentUser, updateProfile, profile, loading },
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

  const validationSchema = Yup.object({
    displayName: Yup.string().required('The displayName property is required.'),
  });

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
            <Formik
              validationSchema={validationSchema}
              enableReinitialize
              initialValues={formValues}
              onSubmit={(values) => handleFormSubmit(values)}
            >
              {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form
                  className='ui form'
                  onSubmit={handleSubmit}
                  autoComplete='off'
                >
                  <ValidatedTextInput
                    placeholder='Display Name'
                    name='displayName'
                  />
                  <ValidatedTextArea
                    rows={3}
                    placeholder='Add your Bio'
                    name='bio'
                  />
                  <Button
                    disabled={isSubmitting || !dirty || !isValid}
                    loading={isSubmitting}
                    floated='right'
                    positive
                    type='submit'
                    content='Update Profile'
                  />
                </Form>
              )}
            </Formik>
          ) : (
            <p>{profile?.bio}</p>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
}

export default observer(UserProfileAbout);
