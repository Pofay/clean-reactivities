import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { useStore } from '../../../App/stores/store'
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
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
