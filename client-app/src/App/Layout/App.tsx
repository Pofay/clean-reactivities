import { useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/interfaces/activity'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard'
import Navbar from './Navbar'
import LoadingComponent from './LoadingComponent'
import { useStore } from '../stores/store'
import { observer } from 'mobx-react-lite'

function App() {
  const { activityStore } = useStore()

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  const handleSubmit = (activity: Activity) => {
    if (activityStore.activities.some((a) => a.id === activity.id)) {
      activityStore.updateActivity(activity)
    } else {
      activityStore.createActivity(activity)
    }
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
        />
      </Container>
    </>
  )
}

export default observer(App)
