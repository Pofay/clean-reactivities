import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import ActivityDetails from '../details/ActivityDetails'
import ActivityList from './ActivityList'

interface ActivityDashboardProps {
  activities: Activity[]
}

function ActivityDashboard({ activities }: ActivityDashboardProps) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList activities={activities} />
      </Grid.Column>
      <Grid.Column width='6'>
        {activities[1] && <ActivityDetails activity={activities[1]} />}
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
