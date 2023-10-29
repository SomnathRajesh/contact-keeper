import React, { useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import { Home } from '../pages/Home';
export const PrivateRoute = ({ element: Element, ...rest }) => {
  const AuthContext = useContext(authContext);
  const { isAuthenticated, loading } = AuthContext;
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        {...rest}
        element={(props) =>
          !isAuthenticated && !loading ? (
            navigate('/login')
          ) : (
            <Element {...props} />
          )
        }
      />
    </Routes>
  );
};
