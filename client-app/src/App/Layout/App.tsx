import 'semantic-ui-css/semantic.min.css'
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import HomePage from '../../Features/home/HomePage'
import { Route, Routes } from 'react-router-dom'
import TestErrors from '../../Features/Errors/TestError'
import { ToastContainer } from 'react-toastify'
import NotFound from '../../Features/Errors/NotFound'

function App() {
  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<HomePage />} />
        <Route path='errors' element={<TestErrors />} />
        <Route path='activities/*' element={<ActivityDashboard />} />
      </Routes>
    </>
  )
}

export default observer(App)
