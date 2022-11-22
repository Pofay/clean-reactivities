import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import Navbar from '../../../App/Layout/Navbar'
import { useStore } from '../../../App/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

function ActivityDashboard() {
  const { activityStore } = useStore()
  const { activityRegistry, loadActivities } = activityStore

  useEffect(() => {
    if (activityRegistry.size <= 1) loadActivities()
  }, [activityRegistry.size, loadActivities])

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading app' />

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route index element={<ActivityList />} />
          <Route path=':id' element={<ActivityDetails />} />
          <Route path='createActivity' element={<ActivityForm />} />
          <Route path='manage/:id' element={<ActivityForm />} />
        </Routes>
      </Container>
    </>
  )
}

export default observer(ActivityDashboard)
