import { Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import ActivityItem from './ActivityItem'

interface ActivityListProps {
  activities: Activity[]
  onSelectActivity: (activity: Activity) => void
  deleteActivity: (id: string) => void
}
function ActivityList({
  activities,
  onSelectActivity,
  deleteActivity,
}: ActivityListProps) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((a) => (
          <ActivityItem
            onSelectActivity={onSelectActivity}
            deleteActivity={deleteActivity}
            key={a.id}
            activity={a}
          />
        ))}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList
