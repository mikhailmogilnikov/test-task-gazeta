/* eslint-disable @conarti/feature-sliced/public-api */
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);