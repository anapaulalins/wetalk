import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Routes from './routes';
import {StatusBar} from 'react-native';
import {AuthProvider} from './hooks/Auth';
const App = () => {
  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0.1)" translucent />
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
