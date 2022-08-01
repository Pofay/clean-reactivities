import React from 'react'
import { Image, Card, Button } from 'semantic-ui-react'
import { useStore } from '../../../App/stores/store'

function ActivityDetails() {
  const { activityStore } = useStore()

  const { selectedActivity: activity } = activityStore
  const handleCancel = (event: React.MouseEvent) => {
    event.preventDefault()
    activityStore.closeForm()
  }

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault()
    activityStore.openForm(activity)
  }

  if (!activity) return <></>

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
          <Button basic color='blue' content='Edit' onClick={handleClick} />
          <Button basic color='grey' content='Cancel' onClick={handleCancel} />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default ActivityDetails
