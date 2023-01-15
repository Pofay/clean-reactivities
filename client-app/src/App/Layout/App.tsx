import 'semantic-ui-css/semantic.min.css';
import ActivityDashboard from '../../Features/Activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../Features/home/HomePage';
import { Outlet, Route, Routes } from 'react-router-dom';
import TestErrors from '../../Features/Errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../Features/Errors/NotFound';
import ServerError from '../../Features/Errors/ServerError';
import CommonLayout from './CommonLayout';
import LoginForm from '../../Features/Users/LoginForm';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';

function App() {
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore]);

  if (!commonStore.appLoaded)
    return <LoadingComponent content='Loading app...' />;

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <Routes>
        <Route
          element={
            <CommonLayout>
              <Outlet />
            </CommonLayout>
          }
        >
          <Route path='*' element={<NotFound />} />
          <Route path='errors' element={<TestErrors />} />
          <Route path='login' element={<LoginForm />} />
          <Route path='server-error' element={<ServerError />} />
          <Route path='activities/*' element={<ActivityDashboard />} />
        </Route>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default observer(App);
