import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'

interface Props {
  activity: Activity | undefined
  onSubmit: (activity: Activity) => void
  onCancel: () => void
}

function ActivityForm(props: Props) {
  const [activity, setActivity] = useState<Activity>(
    props.activity ?? {
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
    props.onCancel()
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
          onChange={handleChange}
        />
        <Form.TextArea
          placeholder='Description'
          name='description'
          value={activity.description}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Category'
          name='category'
          value={activity.category}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Date'
          name='date'
          value={activity.date}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='City'
          name='city'
          value={activity.city}
          onChange={handleChange}
        />
        <Form.Input
          placeholder='Venue'
          name='venue'
          value={activity.venue}
          onChange={handleChange}
        />
        <Button floated='right' positive type='submit' content='Submit' />
        <Button
          floated='right'
          type='button'
          content='Cancel'
          onClick={props.onCancel}
        />
      </Form>
    </Segment>
  )
}

export default ActivityForm
