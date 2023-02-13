import ValidatedTextArea from 'App/common/form/ValidatedTextArea';
import ValidatedTextInput from 'App/common/form/ValidatedTextInput';
import { UserProfileFormValues } from 'App/models/interfaces/profile';
import { Form, Formik } from 'formik';
import { Button } from 'semantic-ui-react';
import * as Yup from 'yup';

interface Props {
  formValues: UserProfileFormValues;
  handleSubmit: (formValues: UserProfileFormValues) => void;
}

function UserProfileEditForm(props: Props) {
  const { formValues, handleSubmit } = props;

  const validationSchema = Yup.object({
    displayName: Yup.string().required('The displayName property is required.'),
  });

  return (
    <Formik
      validationSchema={validationSchema}
      enableReinitialize
      initialValues={formValues}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ handleSubmit, isValid, isSubmitting, dirty }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <ValidatedTextInput placeholder='Display Name' name='displayName' />
          <ValidatedTextArea rows={3} placeholder='Add your Bio' name='bio' />
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
  );
}

export default UserProfileEditForm;
