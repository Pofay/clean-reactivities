import App from 'App/Layout/App';
import ActivityDashboard from 'Features/Activities/dashboard/ActivityDashboard';
import ActivityList from 'Features/Activities/dashboard/ActivityList';
import ActivityDetails from 'Features/Activities/details/ActivityDetails';
import ActivityForm from 'Features/Activities/form/ActivityForm';
import NotFound from 'Features/Errors/NotFound';
import ServerError from 'Features/Errors/ServerError';
import TestErrors from 'Features/Errors/TestError';
import HomePage from 'Features/home/HomePage';
import UserProfilePage from 'Features/profiles/UserProfilePage';
import LoginForm from 'Features/Users/LoginForm';
import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'activities',
        element: <ActivityDashboard />,
        children: [
          { path: ':id', element: <ActivityDetails /> },
          { path: 'createActivity', element: <ActivityForm /> },
          { path: 'manage/:id', element: <ActivityForm /> },
          { path: '', element: <ActivityList /> },
        ],
      },
      { path: 'profiles/:username', element: <UserProfilePage /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'errors', element: <TestErrors /> },
      { path: 'not-found', element: <NotFound /> },
      { path: 'server-error', element: <ServerError /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
