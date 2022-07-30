import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/interfaces/activity'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard'
import Navbar from './Navbar'
import { v4 as uuid } from 'uuid'

const tap =
  (f: (a: any) => void) =>
  (v: any): any => {
    f(v)
    return v
  }

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5272/api/activities')
      .then((res) => res.data)
      .then(tap((a) => console.log(a)))
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
          onCloseForm={handleCloseForm}
          onOpenForm={handleOpenForm}
        />
      </Container>
    </>
  )
}

export default App
