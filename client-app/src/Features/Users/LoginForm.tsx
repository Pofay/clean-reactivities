import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button } from 'semantic-ui-react';
import ValidatedTextInput from '../../App/common/form/ValidatedTextInput';
import { useStore } from '../../App/stores/store';

function LoginForm() {
  const { userStore } = useStore();
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => userStore.login(values)}
    >
      {({ handleSubmit, isSubmitting }) => (
        <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
          <ValidatedTextInput placeholder='Email' name='email' />
          <ValidatedTextInput
            placeholder='Password'
            name='password'
            type='password'
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
