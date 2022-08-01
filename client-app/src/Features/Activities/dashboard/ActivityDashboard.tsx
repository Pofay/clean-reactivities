import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

function ActivityDashboard() {
  const { activityStore } = useStore()
  const { selectedActivity, editMode } = activityStore

  const handleSubmit = (activity: Activity) => {
    if (activityStore.getActivitiesByDate().some((a) => a.id === activity.id)) {
      activityStore.updateActivity(activity)
    } else {
      activityStore.createActivity(activity)
    }
  }

  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm onSubmit={handleSubmit} />}
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
