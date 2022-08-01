import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'
import { useStore } from '../stores/store'

export default function Navbar() {
  const { activityStore } = useStore()
  const handleCreate = (event: React.MouseEvent) => {
    event.preventDefault()
    activityStore.openForm()
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
