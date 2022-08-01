import { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/interfaces/activity'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard'
import Navbar from './Navbar'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

function App() {
  const { activityStore } = useStore()
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

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
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((a) => a.id !== id)])
      setSubmitting(false)
    })
  }

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading app' />

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activityStore.activities}
          onSubmitActivity={handleSubmit}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default observer(App)
