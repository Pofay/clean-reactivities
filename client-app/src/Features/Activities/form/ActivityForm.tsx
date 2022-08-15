import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'

const INITIAL_STATE = {
  id: '',
  title: '',
  date: '',
  description: '',
  category: '',
  city: '',
  venue: '',
}

function ActivityForm() {
  const { activityStore } = useStore()
  const navigate = useNavigate()
  const { loadActivity, loading, loadingInitial } =
    activityStore
  const { id } = useParams<{ id: string }>()

  const [activity, setActivity] = useState<Activity>(INITIAL_STATE)

  useEffect(() => {
    if (id) {
      loadActivity(id).then((a) => setActivity(a!))
    } else {
      setActivity(INITIAL_STATE)
    }
  }, [id, loadActivity])

  const createOrEditActivity = (activity: Activity) => {
    if (activityStore.getActivitiesByDate().some((a) => a.id === activity.id)) {
      activityStore
        .updateActivity(activity)
        .then((id) => navigate(`/activities/${id}`))
    } else {
      activityStore
        .createActivity(activity)
        .then((id) => navigate(`/activities/${id}`))
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    createOrEditActivity(activity)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />

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
          as={Link}
          to='/activities'
          floated='right'
          type='button'
          content='Cancel'
        />
      </Form>
    </Segment>
  )
}

export default observer(ActivityForm)
