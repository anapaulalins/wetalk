import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../pages/chatList';
import Chat from '../components/chat';
import AddFriend from '../pages/addFriend';
import {horizontalAnimation} from './app.routes';
import RegionChoice from '../pages/region';
import VideoCall from '../pages/videoCall';
const Route = createStackNavigator();

const PrivateRoutes: React.FC = () => {
  return (
    <Route.Navigator
      initialRouteName="chatlist"
      screenOptions={{
        headerShown: false,
      }}>
      <Route.Screen name="chatlist" component={ChatList} />
      <Route.Screen name="chat" component={Chat} />
      <Route.Screen
        name="add"
        component={AddFriend}
        options={horizontalAnimation}
      />
      <Route.Screen
        name="region"
        component={RegionChoice}
        options={horizontalAnimation}
      />
      <Route.Screen
        name="videoCall"
        component={VideoCall}
        options={horizontalAnimation}
      />
    </Route.Navigator>
  );
};

export default PrivateRoutes;
