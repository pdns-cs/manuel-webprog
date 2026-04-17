import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// HomePage Structure
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import ArticlePage from './pages/LandingPages/ArticlePage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'articles',
        element: <ArticleListPage />,
      },
      {
        path: 'articles/not-found',
        element: <NotFoundPage />,
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'sign-in',
        element: <SignInPage />,
      },
      {
        path: 'sign-up',
        element: <SignUpPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
