import 'semantic-ui-css/semantic.min.css';
import { useEffect } from 'react';
import { useStore } from 'App/stores/store';
import LoadingComponent from 'App/Layout/LoadingComponent';
import ModalContainer from 'App/common/modals/ModalContainer';
import { ToastContainer } from 'react-toastify';
import { Outlet, Route, Routes } from 'react-router-dom';
import CommonLayout from 'App/Layout/CommonLayout';
import NotFound from 'Features/Errors/NotFound';
import TestErrors from 'Features/Errors/TestError';
import LoginForm from 'Features/Users/LoginForm';
import ServerError from 'Features/Errors/ServerError';
import ActivityDashboard from 'Features/Activities/dashboard/ActivityDashboard';
import HomePage from 'Features/home/HomePage';
import { observer } from 'mobx-react-lite';
import UserProfilePage from 'Features/profiles/UserProfilePage';
import ScrollToTop from 'App/Layout/ScrollToTop';

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
      <ScrollToTop />
      <ModalContainer />
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
          <Route path='profiles/:username' element={<UserProfilePage />} />
        </Route>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  );
}

export default observer(App);
