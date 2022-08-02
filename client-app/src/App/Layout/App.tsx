import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard';
import Navbar from './Navbar';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import HomePage from '../../Features/home/HomePage';
import { Route, Routes } from 'react-router-dom';
import ActivityForm from '../../Features/Activities/form/ActivityForm';

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <LoadingComponent content='Loading app' />;

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: '7em' }}>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/activities' element={<ActivityDashboard />} />
          <Route path='/createActivity' element={<ActivityForm />} />
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);
