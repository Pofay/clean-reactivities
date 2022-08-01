import { Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'
import ActivityItem from './ActivityItem'

interface ActivityListProps {
  activities: Activity[]
  submitting: boolean
  deleteActivity: (id: string) => void
}
function ActivityList({
  activities,
  submitting,
  deleteActivity,
}: ActivityListProps) {
  const { activityStore } = useStore()

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((a) => (
          <ActivityItem
            onSelectActivity={activityStore.selectActivity}
            deleteActivity={deleteActivity}
            submitting={submitting}
            key={a.id}
            activity={a}
          />
        ))}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList
