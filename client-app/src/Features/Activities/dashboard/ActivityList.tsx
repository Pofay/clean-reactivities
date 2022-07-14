import { Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import ActivityItem from './ActivityItem'

interface ActivityListProps {
  activities: Activity[]
  onSelectActivity: (activity: Activity) => void
}
function ActivityList({ activities, onSelectActivity }: ActivityListProps) {
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((a) => (
          <ActivityItem
            onSelectActivity={onSelectActivity}
            key={a.id}
            activity={a}
          />
        ))}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList
