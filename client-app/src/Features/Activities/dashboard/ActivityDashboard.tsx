import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface ActivityDashboardProps {
  activities: Activity[]
  selectedActivity: Activity | undefined
  editMode: boolean
  onSelectActivity: (activity: Activity) => void
  onDeselectActivity: () => void
  onSubmitActivity: (activity: Activity) => void
  deleteActivity: (id: string) => void
  onOpenForm: (activity: Activity) => void
  onCloseForm: () => void
}

function ActivityDashboard({
  activities,
  selectedActivity,
  editMode,
  onSelectActivity,
  onDeselectActivity,
  onSubmitActivity,
  deleteActivity,
  onOpenForm,
  onCloseForm,
}: ActivityDashboardProps) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList
          activities={activities}
          deleteActivity={deleteActivity}
          onSelectActivity={onSelectActivity}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            onDeselectActivity={onDeselectActivity}
            onEditActivity={onOpenForm}
          />
        )}
        {editMode && (
          <ActivityForm
            activity={selectedActivity}
            onSubmit={onSubmitActivity}
            onCancel={onCloseForm}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
