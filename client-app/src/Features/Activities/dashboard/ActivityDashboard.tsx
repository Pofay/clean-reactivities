import { Grid, List } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
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
    </Grid>
  )
}

export default ActivityDashboard
