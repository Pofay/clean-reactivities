import { ErrorMessage, Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Button, Header, Label } from 'semantic-ui-react';
import ValidatedTextInput from '../../App/common/form/ValidatedTextInput';
import { useStore } from '../../App/stores/store';

function LoginForm() {
  const { userStore } = useStore();
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={{ email: '', password: '', error: null }}
      onSubmit={(values, { setErrors }) =>
        userStore
          .login(values)
          .then(() => navigate('/activities'))
          .catch((error) => setErrors({ error: 'Invalid email or password' }))
      }
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <Header
            as='h2'
            content='Login to Reactivities'
            color='teal'
            textAlign='center'
          />
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
            loading={isSubmitting}
            positive
            content='Login'
            type='submit'
            fluid
          />
        </Form>
      )}
    </Formik>
  );
}

export default observer(LoginForm);
