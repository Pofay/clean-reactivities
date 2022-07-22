import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { Activity } from '../models/interfaces/activity'

interface Props {
  onCreateActivity: (activity?: Activity) => void
}
export default function Navbar(props: Props) {
  const handleCreate = (event: React.MouseEvent) => {
    event.preventDefault()
    props.onCreateActivity()
  }
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img
            src='/assets/logo.png'
            alt='logo'
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Actitivies' />
        <Menu.Item>
          <Button positive content='Create Activity' onClick={handleCreate} />
        </Menu.Item>
      </Container>
    </Menu>
  )
}
