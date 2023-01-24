import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../App/Layout/LoadingComponent'
import { useStore } from '../../../App/stores/store'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'

function ActivityDetails() {
  const { activityStore } = useStore()
  const { id } = useParams<{ id: string }>()
  const { selectedActivity: activity } = activityStore

  useEffect(() => {
    if (id) activityStore.loadActivity(id)
  }, [id, activityStore])

  if (!activity) return <LoadingComponent content='Loading Specific Activity' />

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader activity={activity} />
        <ActivityDetailedInfo activity={activity} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar activity={activity}/>
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityDetails)
