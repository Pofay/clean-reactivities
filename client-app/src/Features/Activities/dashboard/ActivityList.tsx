import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'
import ActivityFilters from './ActivityFilters'
import AcitivityListItem from './ActivityListItem'

function ActivityList() {
  const { activityStore } = useStore()
  const { groupedActivities } = activityStore

  return (
    <Grid>
      <Grid.Column width='10'>
        {groupedActivities.map(([group, activities]) => (
          <Fragment key={group}>
            <Header sub color='teal'>
              {group}
            </Header>
            {activities.map((a: Activity) => (
              <AcitivityListItem key={a.id} activity={a} />
            ))}
          </Fragment>
        ))}
      </Grid.Column>
      <Grid.Column width='6'>
        <ActivityFilters />
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityList)
