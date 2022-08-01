import { Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../App/stores/store'
import ActivityItem from './ActivityItem'

interface ActivityListProps {
  deleteActivity: (id: string) => void
}
function ActivityList({ deleteActivity }: ActivityListProps) {
  const { activityStore } = useStore()
  const { loading, activities } = activityStore

  return (
    <Segment>
      <Item.Group divided>
        {activities.map((a) => (
          <ActivityItem
            onSelectActivity={activityStore.selectActivity}
            deleteActivity={deleteActivity}
            loading={loading}
            key={a.id}
            activity={a}
          />
        ))}
      </Item.Group>
    </Segment>
  )
}

export default ActivityList
