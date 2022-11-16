import 'semantic-ui-css/semantic.min.css'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import HomePage from '../../Features/home/HomePage'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='activities/*' element={<ActivityDashboard />} />
      </Routes>
    </>
  )
}

export default observer(App)
