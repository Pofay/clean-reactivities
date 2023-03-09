import 'App/Layout/styles.css';
import { router } from 'App/router/Routes';
import { store, StoreContext } from 'App/stores/store';
import 'react-calendar/dist/Calendar.css';
import 'react-datepicker/dist/react-datepicker.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
