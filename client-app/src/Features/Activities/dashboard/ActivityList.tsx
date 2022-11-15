import { observer } from 'mobx-react-lite'
import { Fragment } from 'react'
import { Grid, Header, Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'
import { useStore } from '../../../App/stores/store'
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
            <Segment>
              <Item.Group divided>
                {activities.map((a: Activity) => (
                  <AcitivityListItem key={a.id} activity={a} />
                ))}
              </Item.Group>
            </Segment>
          </Fragment>
        ))}
      </Grid.Column>
    </Grid>
  )
}

export default observer(ActivityList)
