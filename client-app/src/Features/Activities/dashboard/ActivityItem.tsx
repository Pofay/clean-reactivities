import { Button, Item, Label } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'

interface Props {
  activity: Activity
}

function ActivityItem({ activity }: Props) {
  return (
    <Item key={activity.id}>
      <Item.Content>
        <Item.Header as='a'> {activity.title}</Item.Header>
        <Item.Meta>{activity.date.toString()}</Item.Meta>
        <Item.Description>
          <div>{activity.description}</div>
          <div>
            <address>
              {activity.city}, {activity.venue}
            </address>
          </div>
        </Item.Description>
        <Item.Extra>
          <Button floated='right' content='View' color='blue' />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default ActivityItem
