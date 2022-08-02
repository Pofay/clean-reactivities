import { observer } from 'mobx-react-lite'
import { Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'
import ActivityItem from './ActivityItem'

function ActivityList() {
  const { activityStore } = useStore()
  const { loading, getActivitiesByDate, deleteActivity } = activityStore

  return (
    <Segment>
      <Item.Group divided>
        {getActivitiesByDate().map((a: Activity) => (
          <ActivityItem
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
