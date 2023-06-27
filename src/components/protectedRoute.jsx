import React from 'react';
import { useAuth } from '../hooks/useAuth';
import LoadingPage from './LoadingPage';

const ProtectedRoute = ({ children, ...rest }) => {
  const { loading } = useAuth({ needsAuth: true });
  if (loading) {
    return <LoadingPage />;
  }
  return React.cloneElement(children, { ...rest });
};
export default ProtectedRoute;
