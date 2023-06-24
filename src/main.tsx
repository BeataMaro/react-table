import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { photoApi } from './services/api.service';
import { store } from './store/store';
import Layout from './Layout/Layout';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import './index.scss';
import UserPage from './pages/UserPage/UserPage';


const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/:username',
        element: <UserPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: ':username/:id',
        element: <DetailsPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApiProvider api={photoApi}>
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
