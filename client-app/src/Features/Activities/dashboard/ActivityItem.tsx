import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'

interface Props {
  activity: Activity
  onSelectActivity: (id: string) => void
  loading: boolean
  deleteActivity: (id: string) => void
}

function ActivityItem({
  activity,
  onSelectActivity,
  loading,
  deleteActivity,
}: Props) {
  const [target, setTarget] = useState('')

  const handleSelectActivity = (event: React.MouseEvent) => {
    event.preventDefault()
    onSelectActivity(activity.id)
  }

  const handleDeleteActivity = (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.preventDefault()
    setTarget(event.currentTarget.name)
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
            name={activity.id}
            floated='right'
            content='Delete'
            color='red'
            loading={loading && target === activity.id}
            onClick={(e) => handleDeleteActivity(e, activity.id)}
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default ActivityItem
