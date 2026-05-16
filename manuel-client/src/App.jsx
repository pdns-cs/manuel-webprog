import { Navigate, createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';

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
import ArticlesPage from './pages/DashboardPages/ArticlesPage';

import NotFoundPage from './pages/NotFoundPage';

const dashboardRoles = ['admin', 'editor'];

const getCurrentUserType = () => sessionStorage.getItem('type');

const clearStoredUser = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('type');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('type');
};

const RequireAuth = ({ allowedRoles = [], children }) => {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  const userType = getCurrentUserType();

  if (!token) {
    clearStoredUser();

    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }

  if (allowedRoles.length && !allowedRoles.includes(userType)) {
    clearStoredUser();

    return <Navigate to="/auth/signin" replace state={{ from: location }} />;
  }

  return children;
};

const RequireRole = ({ allowedRoles, children }) => {
  const userType = getCurrentUserType();

  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

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
    element: (
      <RequireAuth allowedRoles={dashboardRoles}>
        <DashLayout />
      </RequireAuth>
    ),
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
        element: (
          <RequireRole allowedRoles={['admin']}>
            <UsersPage />
          </RequireRole>
        ),
      },
      {
        path: 'articles',
        element: <ArticlesPage />,
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
