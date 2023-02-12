import ValidatedTextArea from 'App/common/form/ValidatedTextArea';
import ValidatedTextInput from 'App/common/form/ValidatedTextInput';
import { UserProfile } from 'App/models/interfaces/profile';
import { useStore } from 'App/stores/store';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Button, Form, Grid, GridColumn, Header } from 'semantic-ui-react';
import * as Yup from 'yup';

interface Props {
  profile: UserProfile;
}

interface AboutFormValues {
  displayName: string;
  bio?: string | undefined;
}

const mapToFormValues = (profile: UserProfile): AboutFormValues => {
  return {
    bio: profile.bio,
    displayName: profile.displayName,
  };
};

function UserProfileAbout(props: Props) {
  const { profile } = props;
  const {
    userProfileStore: { isCurrentUser },
  } = useStore();
  const [editAboutMode, setEditAboutMode] = useState(false);
  const [formValues, setFormValues] = useState<AboutFormValues>(
    mapToFormValues(profile)
  );

  const validationSchema = Yup.object({
    displayName: Yup.string().required('The displayName property is required.'),
  });

  const handleFormSubmit = (values: AboutFormValues) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={16}>
        <Header
          floated='left'
          icon='user'
          content={`About ${profile.displayName}`}
        />
        {isCurrentUser && (
          <Button
            floated='right'
            basic
            content={editAboutMode ? 'Cancel' : 'Edit Profile'}
            onClick={() => setEditAboutMode(!editAboutMode)}
          />
        )}
      </Grid.Column>

      <Grid.Column width={16}>
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
      </Grid.Column>
    </Grid>
  );
}

export default observer(UserProfileAbout);
