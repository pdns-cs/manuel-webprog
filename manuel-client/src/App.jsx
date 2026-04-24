import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom';

// HomePage Structure
import Layout from './layouts/Layout';
import ArticlePage from './pages/LandingPages/ArticlePage';
import HomePage from './pages/LandingPages/HomePage';
import AboutPage from './pages/LandingPages/AboutPage';
import ArticleListPage from './pages/LandingPages/ArticleListPage';

import AuthLayout from './layouts/AuthLayout';
import SignInPage from './pages/AuthPages/SignInPage';
import SignUpPage from './pages/AuthPages/SignUpPage';

import DashLayout from './layouts/DashLayout';
import Dashboard from './pages/DashboardPages/Dashboard';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';

import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
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
        path: 'articles/:name',
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: 'auth/',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="signin" replace />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />,
      },
    ],
  },
  {
    path: 'sign-in',
    element: <Navigate to="/auth/signin" replace />,
  },
  {
    path: 'sign-up',
    element: <Navigate to="/auth/signup" replace />,
  },
  {
    path: 'dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
