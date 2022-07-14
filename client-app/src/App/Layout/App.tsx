import React, { useEffect, useState } from 'react'
import axios from 'axios'
import 'semantic-ui-css/semantic.min.css'
import { Header, List } from 'semantic-ui-react'
import { Activity } from '../models/interfaces/activity'
import Navbar from './Navbar'

const tap =
  (f: (a: any) => void) =>
  (v: any): any => {
    f(v)
    return v
  }

function App() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5272/api/activities')
      .then((res) => res.data)
      .then(tap((a) => console.log(a)))
      .then(setActivities)
  }, [])
  return (
    <div>
      <Navbar />
      <List>
        {activities.map((a) => (
          <List.Item key={a.id}>{a.title}</List.Item>
        ))}
      </List>
    </div>
  )
}

export default App
