import React from 'react'
import { Image, Card, Button } from 'semantic-ui-react'
import { Activity } from '../../../App/models/interfaces/activity'

interface Props {
  activity: Activity
  onDeselectActivity: () => void
}

function ActivityDetails({ activity, onDeselectActivity }: Props) {
  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault()
    onDeselectActivity()
  }

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date.toString()}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths='2'>
          <Button basic color='blue' content='Edit' />
          <Button basic color='grey' content='Cancel' onClick={handleCancel} />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default ActivityDetails
