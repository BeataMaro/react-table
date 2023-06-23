import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Layout from './Layout/Layout.tsx';
import DetailsPage from './pages/DetailsPage/DetailsPage';
import HomePage from './pages/HomePage/HomePage';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { photoApi } from './services/api.service';
import { store } from './store/store';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Navigate replace to="/home" />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/home',
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/:username',
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
