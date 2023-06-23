import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Layout from './Layout/Layout.tsx';
import PhotoDetails from './pages/PhotoDetails/PhotoDetails.tsx';
import HomePage from './pages/HomePage/HomePage.tsx';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import { Provider } from 'react-redux';
import { photoApi } from './services/api.service.tsx';
import { store } from './store/store.tsx';


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
        element: <PhotoDetails />,
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
