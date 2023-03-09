import ModalContainer from 'App/common/modals/ModalContainer';
import CommonLayout from 'App/Layout/CommonLayout';
import LoadingComponent from 'App/Layout/LoadingComponent';
import { useStore } from 'App/stores/store';
import HomePage from 'Features/home/HomePage';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'semantic-ui-css/semantic.min.css';

function App() {
  const { commonStore, userStore } = useStore();
  const location = useLocation();

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
      <ScrollRestoration />
      <ModalContainer />
      <ToastContainer position='bottom-right' hideProgressBar />
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          <CommonLayout>
            <Outlet />
          </CommonLayout>
        </>
      )}
    </>
  );
}

export default observer(App);
