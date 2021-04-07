import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Lading from '../pages/landing';
import Login from '../pages/login';
import RegionChoice from '../pages/region';
import SignUp from '../pages/signup';

const Route = createStackNavigator();

export const horizontalAnimation = {
  cardStyleInterpolator: ({current, layouts}: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const AppRoutes: React.FC = () => {
  return (
    <Route.Navigator
      initialRouteName="landing"
      screenOptions={{
        headerShown: false,
      }}>
      <Route.Screen name="landing" component={Lading} />
      <Route.Screen name="login" component={Login} />
      <Route.Screen name="signup" component={SignUp} />
      <Route.Screen
        name="region"
        component={RegionChoice}
        options={horizontalAnimation}
      />
    </Route.Navigator>
  );
};

export default AppRoutes;
