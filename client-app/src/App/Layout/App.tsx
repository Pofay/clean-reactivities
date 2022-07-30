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

  useEffect(() => {
    agent.Activities.list()
      .then(tap((a) => console.log(a)))
      .then(formatDates)
      .then(setActivities)
  }, [])

  const handleSelectActivity = (activity: Activity) => {
    setSelectedActivity(activity)
  }

  const handleDeselectActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleSubmit = (activity: Activity) => {
    if (activities.some((a) => a.id === activity.id)) {
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ])
    } else {
      setActivities([...activities, { ...activity, id: uuid() }])
    }
    setEditMode(false)
    setSelectedActivity(activity)
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
        />
      </Container>
    </>
  )
}

export default App
