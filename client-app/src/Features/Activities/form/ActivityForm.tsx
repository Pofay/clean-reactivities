import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../App/models/interfaces/activity';
import { useStore } from '../../../App/stores/store';

function ActivityForm() {
  const { activityStore } = useStore();
  const { selectedActivity, loading, closeForm } = activityStore;

  const [activity, setActivity] = useState<Activity>(
    selectedActivity ?? {
      id: '',
      title: '',
      date: '',
      description: '',
      category: '',
      city: '',
      venue: '',
    }
  );

  const createOrEditActivity = (activity: Activity) => {
    if (activityStore.getActivitiesByDate().some((a) => a.id === activity.id)) {
      activityStore.updateActivity(activity);
    } else {
      activityStore.createActivity(activity);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    createOrEditActivity(activity)
  };

  const handleClose = (event: React.SyntheticEvent) => {
    event.preventDefault();
    closeForm();
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete='off'>
        <Form.Input
          placeholder='Title'
          name='title'
          value={activity.title}
          required={true}
          onChange={handleChange}
        />
        <Form.TextArea
          placeholder='Description'
          name='description'
          value={activity.description}
          required={true}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Category'
          name='category'
          value={activity.category}
          required={true}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Date'
          type='date'
          name='date'
          value={activity.date}
          required={true}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='City'
          name='city'
          value={activity.city}
          required={true}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Venue'
          name='venue'
          value={activity.venue}
          required={true}
          onChange={handleChange}
        />
        <Button
          loading={loading}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          floated='right'
          type='button'
          content='Cancel'
          onClick={handleClose}
        />
      </Form>
    </Segment>
  );
}

export default observer(ActivityForm);
