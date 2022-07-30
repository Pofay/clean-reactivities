import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/interfaces/activity'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard'
import Navbar from './Navbar'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'
import { parseISO, format } from 'date-fns/fp'
import { pipe } from 'fp-ts/lib/function'
import LoadingComponent from './LoadingComponent'

const tap =
  (f: (a: any) => void) =>
  (v: any): any => {
    f(v)
    return v
  }

const parseAndFormatISODateString = (isoDateString: string) =>
  pipe(isoDateString, parseISO, format('yyyy-mm-dd'))

const formatDates = (activities: Activity[]) =>
  activities.map((a) => ({
    ...a,
    date: parseAndFormatISODateString(a.date),
  }))

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    agent.Activities.list()
      .then(tap((a) => console.log(a)))
      .then(formatDates)
      .then(setActivities)
      .then(() => setLoading(false))
  }, [])

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity)
  }

  const handleDeselectActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleSubmit = (activity: Activity) => {
    setSubmitting(true)
    if (activities.some((a) => a.id === activity.id)) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((a) => a.id !== activity.id),
          activity,
        ])
        setEditMode(false)
        setSelectedActivity(activity)
        setSubmitting(false)
      })
    } else {
      const newActivity = { ...activity, id: uuid() }
      agent.Activities.create(newActivity).then(() => {
        setActivities([...activities, newActivity])
        setEditMode(false)
        setSelectedActivity(activity)
        setSubmitting(false)
      })
    }
  }

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((a) => a.id !== id)])
  }

  const handleOpenForm = (activity?: Activity) => {
    activity ? handleSelectActivity(activity) : handleDeselectActivity()
    setEditMode(true)
  }

  const handleCloseForm = () => {
    setEditMode(false)
  }

  if (loading) return <LoadingComponent content='Loading app' />
  return (
    <>
      <Navbar onCreateActivity={handleOpenForm} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          editMode={editMode}
          onSelectActivity={handleSelectActivity}
          onDeselectActivity={handleDeselectActivity}
          onSubmitActivity={handleSubmit}
          deleteActivity={handleDeleteActivity}
          onCloseForm={handleCloseForm}
          onOpenForm={handleOpenForm}
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App
