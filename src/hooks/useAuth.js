import { useEffect } from 'react';
import { useUser } from './useUser';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * @param {Object} options
 * @param {string} options.redirect - The path to redirect to after login
 * @param {boolean} options.needsAuth - If true, redirect to login if not logged in
 */
export const useAuth = ({ redirect = '/', needsAuth = false } = {}) => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      // if user is not logged in and needs to be, redirect to login
      if (!user && needsAuth) {
        // if user is already on signup or login page do not navigate
        if (location.pathname === '/signup' || location.pathname === '/login') {
          return;
        }

        navigate('/login', { state: { redirect: location.pathname } });
      }

      // if user is logged in and does not need to be, redirect to home
      if (user && !needsAuth) {
        navigate(redirect);
      }
    }
  }, [loading, user]);

  return { loading };
};
