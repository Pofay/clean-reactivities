import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import HomePage from '../../Features/home/HomePage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='activities/*' element={<ActivityDashboard />} />
        </Routes>
      </Container>
    </>
  )
}

export default observer(App)
