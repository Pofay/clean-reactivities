import ValidatedDateInput from 'App/common/form/ValidateDateInput';
import ValidatedSelectInput from 'App/common/form/ValidatedSelectInput';
import ValidatedTextArea from 'App/common/form/ValidatedTextArea';
import ValidatedTextInput from 'App/common/form/ValidatedTextInput';
import { categoryOptions } from 'App/common/options/CategoryOptions';
import LoadingComponent from 'App/Layout/LoadingComponent';
import {
  ActivityFormValues,
  mapToFormValues,
} from 'App/models/interfaces/activity';
import { useStore } from 'App/stores/store';
import { Form, Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import * as Yup from 'yup';

const INITIAL_STATE = {
  id: '',
  title: '',
  date: null,
  description: '',
  category: '',
  city: '',
  venue: '',
};

function ActivityForm() {
  const { activityStore } = useStore();
  const navigate = useNavigate();
  const { loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<ActivityFormValues>(INITIAL_STATE);

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required('Date is required').nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      loadActivity(id).then((a) => setActivity(mapToFormValues(a!)));
    } else {
      setActivity(INITIAL_STATE);
    }
  }, [id, loadActivity]);

  const createOrEditActivity = (activity: ActivityFormValues) => {
    if (activityStore.activitiesByDate.some((a) => a.id === activity.id)) {
      activityStore
        .updateActivity(activity)
        .then((id) => navigate(`/activities/${id}`));
    } else {
      activityStore
        .createActivity(activity)
        .then((id) => navigate(`/activities/${id}`));
    }
  };

  const handleFormSubmit = (formValues: ActivityFormValues) => {
    createOrEditActivity(formValues);
  };

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />;

  return (
    <Segment clearing>
      <Header content='Activity Details' sub color='teal' />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <ValidatedTextInput placeholder='Title' name='title' />
            <ValidatedTextArea
              rows={3}
              placeholder='Description'
              name='description'
            />
            <ValidatedSelectInput
              options={categoryOptions}
              placeholder='Category'
              name='category'
            />
            <ValidatedDateInput
              placeholderText='Date'
              name='date'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy hh:mm aa'
            />
            <Header content='Location Details' sub color='teal' />
            <ValidatedTextInput placeholder='City' name='city' />
            <ValidatedTextInput placeholder='Venue' name='venue' />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={isSubmitting}
              floated='right'
              positive
              type='submit'
              content='Submit'
            />
            <Button
              as={Link}
              to='/activities'
              floated='right'
              type='button'
              content='Cancel'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}

export default observer(ActivityForm);
