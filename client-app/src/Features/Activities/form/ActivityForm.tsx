import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'

interface Props {
  submitting: boolean
  onSubmit: (activity: Activity) => void
}

function ActivityForm(props: Props) {
  const { activityStore } = useStore()
  const { selectedActivity, closeForm } = activityStore

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
  )

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    props.onSubmit(activity)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

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
          loading={props.submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          floated='right'
          type='button'
          content='Cancel'
          onClick={closeForm}
        />
      </Form>
    </Segment>
  )
}

export default ActivityForm
