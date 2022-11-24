import { Formik, Form, ErrorMessage } from 'formik'
import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, FormField, Label, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'
import * as Yup from 'yup'
import MyTextInput from '../../../App/common/form/MyTextInput'

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
  const { loadActivity, loading, loadingInitial } = activityStore
  const { id } = useParams<{ id: string }>()

  const [activity, setActivity] = useState<Activity>(INITIAL_STATE)

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  })

  useEffect(() => {
    if (id) {
      loadActivity(id).then((a) => setActivity(a!))
    } else {
      setActivity(INITIAL_STATE)
    }
  }, [id, loadActivity])

  const createOrEditActivity = (activity: Activity) => {
    if (activityStore.activitiesByDate.some((a) => a.id === activity.id)) {
      console.log('Edit Activity')
      activityStore
        .updateActivity(activity)
        .then((id) => navigate(`/activities/${id}`))
    } else {
      activityStore
        .createActivity(activity)
        .then((id) => navigate(`/activities/${id}`))
    }
  }

  /*
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    createOrEditActivity(activity)
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
  */

  if (loadingInitial) return <LoadingComponent content='Loading activity...' />

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
            <MyTextInput placeholder='Title' name='title' />
            <MyTextInput placeholder='Description' name='description' />
            <MyTextInput placeholder='Category' name='category' />
            <MyTextInput placeholder='Date' name='date' />
            <MyTextInput placeholder='City' name='city' />
            <MyTextInput placeholder='Venue' name='venue' />
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
        )}
      </Formik>
    </Segment>
  )
}

export default observer(ActivityForm)
