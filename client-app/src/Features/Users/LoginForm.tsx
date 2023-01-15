import { Form, Formik } from 'formik';
import { Button } from 'semantic-ui-react';
import ValidatedTextInput from '../../App/common/form/ValidatedTextInput';

function LoginForm() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleSubmit }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <ValidatedTextInput placeholder='Email' name='email' />
          <ValidatedTextInput
            placeholder='Password'
            name='password'
            type='password'
          />
          <Button positive content='Login' type='submit' fluid />
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
