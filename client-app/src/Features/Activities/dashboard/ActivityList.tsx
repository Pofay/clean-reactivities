import { observer } from 'mobx-react-lite'
import { Item, Segment } from 'semantic-ui-react'
import { useStore } from '../../../App/stores/store'
import ActivityItem from './ActivityItem'

function ActivityList() {
  const { activityStore } = useStore()
  const { loading, activities, deleteActivity } = activityStore

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

export default observer(ActivityList)
