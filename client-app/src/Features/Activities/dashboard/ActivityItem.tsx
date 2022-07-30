import React from 'react'
import { Button, Item, Label } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'

interface Props {
  activity: Activity
  onSelectActivity: (activity: Activity) => void
  deleteActivity: (id: string) => void
}

function ActivityItem({ activity, onSelectActivity, deleteActivity }: Props) {
  const handleSelectActivity = (event: React.MouseEvent) => {
    event.preventDefault()
    onSelectActivity(activity)
  }

  const handleDeleteActivity = (event: React.MouseEvent) => {
    event.preventDefault()
    deleteActivity(activity.id)
  }

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
          <Button
            floated='right'
            content='View'
            color='blue'
            onClick={handleSelectActivity}
          />
          <Button
            floated='right'
            content='Delete'
            color='red'
            onClick={handleDeleteActivity}
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default ActivityItem
