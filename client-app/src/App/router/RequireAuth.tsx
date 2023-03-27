import { useStore } from 'App/stores/store';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function RequireAuth() {
  const {
    userStore: { isLoggedIn },
  } = useStore();
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to='/' state={{ from: location }} />;
  }
  return <Outlet />;
}

export default RequireAuth;
