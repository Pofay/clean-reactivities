import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import { Header, List } from 'semantic-ui-react'

const tap =
  (f: (a: any) => void) =>
  (v: any): any => {
    f(v)
    return v
  }

function App() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:5272/api/activities')
      .then((res) => res.data)
      .then(tap((a) => console.log(a)))
      .then(setActivities)
  }, [])
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />
      <List>
        {activities.map((a: any) => (
          <List.Item key={a.id}>{a.title}</List.Item>
        ))}
      </List>
    </div>
  )
}

export default App
