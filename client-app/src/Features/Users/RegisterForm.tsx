import { Formik, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Form, Header, Label, Button } from 'semantic-ui-react';
import ValidatedTextInput from '../../App/common/form/ValidatedTextInput';
import { useStore } from '../../App/stores/store';
import * as Yup from 'yup';

function RegisterForm() {
  const { userStore } = useStore();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        displayName: '',
        userName: '',
        email: '',
        password: '',
        error: null,
      }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .register(values)
          .then(() => navigate('/activities'))
          .catch((error) => setErrors({ error: 'Invalid email or password' }))
      }
      validationSchema={Yup.object({
        displayName: Yup.string().required(),
        userName: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
      })}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <Header
            as='h2'
            content='Sign up to Reactivities'
            color='teal'
            textAlign='center'
          />
          <ValidatedTextInput placeholder='Display Name' name='displayName' />
          <ValidatedTextInput placeholder='Username' name='userName' />
          <ValidatedTextInput placeholder='Email' name='email' />

          <ValidatedTextInput
            placeholder='Password'
            name='password'
            type='password'
          />
          <ErrorMessage
            name='error'
            render={() => (
              <Label
                style={{ marginBottom: 10 }}
                basic
                color='red'
                content={errors.error}
              />
            )}
          />
          <Button
            disabled={!isValid || !dirty || isSubmitting}
            loading={isSubmitting}
            positive
            content='Register'
            type='submit'
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default RegisterForm;
