import { observer } from 'mobx-react-lite'
import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface ActivityDashboardProps {
  activities: Activity[]
  onSubmitActivity: (activity: Activity) => void
}

function ActivityDashboard({
  activities,
  onSubmitActivity,
}: ActivityDashboardProps) {
  const { activityStore } = useStore()
  const { selectedActivity, editMode } = activityStore
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode && <ActivityDetails />}
        {editMode && <ActivityForm onSubmit={onSubmitActivity} />}
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDashboard)
