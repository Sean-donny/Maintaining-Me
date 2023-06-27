import { createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import AppLayout from './components/Layout';
// pages
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import SetUserInfo from './pages/SetUserInfo';
import SetUserTarget from './pages/SetUserTarget';
import UserBriefing from './pages/UserBriefing';
import UserTimeline from './pages/UserTimeline';
import AwardStudio from './pages/AwardStudio';
import DiaryStudio from './pages/DiaryStudio';
import ExerciseStudio from './pages/ExerciseStudio';
import Error404 from './pages/Error404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error404 />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/setuserinfo',
        element: (
          <ProtectedRoute>
            <SetUserInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: '/setusertarget',
        element: (
          <ProtectedRoute>
            <SetUserTarget />
          </ProtectedRoute>
        ),
      },
      {
        path: '/userbriefing',
        element: (
          <ProtectedRoute>
            <UserBriefing />
          </ProtectedRoute>
        ),
      },
      {
        path: '/usertimeline',
        element: (
          <ProtectedRoute>
            <UserTimeline />
          </ProtectedRoute>
        ),
      },
      {
        path: '/awardstudio',
        element: (
          <ProtectedRoute>
            <AwardStudio />
          </ProtectedRoute>
        ),
      },
      {
        path: '/diarystudio',
        element: (
          <ProtectedRoute>
            <DiaryStudio />
          </ProtectedRoute>
        ),
      },
      {
        path: '/exercisestudio',
        element: (
          <ProtectedRoute>
            <ExerciseStudio />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
