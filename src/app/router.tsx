import { createBrowserRouter } from 'react-router-dom';
import { ErrorPage } from '@/pages/error';
import { HomePage } from '@/pages/home';
import { PostPage } from '@/pages/post';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'posts/:postId',
    element: <PostPage />,
  },
]);
