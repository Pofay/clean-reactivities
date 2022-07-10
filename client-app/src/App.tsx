import React, { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'

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
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <ul>
          {activities.map((a: any) => (
            <li key={a.id}>{a.title}</li>
          ))}
        </ul>
      </header>
    </div>
  )
}

export default App
