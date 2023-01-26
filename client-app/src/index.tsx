import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-calendar/dist/Calendar.css';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import App from 'App/Layout/App';
import 'App/Layout/styles.css';
import { store, StoreContext } from 'App/stores/store';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import 'react-datepicker/dist/react-datepicker.css';

export const history = createBrowserHistory();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <HistoryRouter history={history}>
        <App />
      </HistoryRouter>
    </StoreContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
