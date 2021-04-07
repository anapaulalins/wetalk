import React from 'react';
import {useAuth} from '../hooks/Auth';
import PrivateRoutes from './app.private..routes';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const {user} = useAuth();

  return user ? <PrivateRoutes /> : <AppRoutes />;
};

export default Routes;
