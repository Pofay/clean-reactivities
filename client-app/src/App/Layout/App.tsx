import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard';
import Navbar from './Navbar';
import { observer } from 'mobx-react-lite';
import HomePage from '../../Features/home/HomePage';
import { Route, Routes } from 'react-router-dom';
import ActivityForm from '../../Features/Activities/form/ActivityForm';
import ActivityDetails from '../../Features/Activities/details/ActivityDetails';

function App() {
  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/activities' element={<ActivityDashboard />} />
          <Route path='/activities/:id' element={<ActivityDetails />} />
          <Route path='/createActivity' element={<ActivityForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
