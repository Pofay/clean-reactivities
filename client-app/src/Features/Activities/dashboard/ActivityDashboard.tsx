import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface ActivityDashboardProps {
  activities: Activity[]
  selectedActivity: Activity | undefined
  onSelectActivity: (activity: Activity) => void
  onDeselectActivity: () => void
}

function ActivityDashboard({
  activities,
  selectedActivity,
  onSelectActivity,
  onDeselectActivity,
}: ActivityDashboardProps) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList
          activities={activities}
          onSelectActivity={onSelectActivity}
        />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && (
          <ActivityDetails
            activity={selectedActivity}
            onDeselectActivity={onDeselectActivity}
          />
        )}
        <ActivityForm />
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
