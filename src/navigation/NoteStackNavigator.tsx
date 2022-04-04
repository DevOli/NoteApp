import React, {useContext} from 'react';

import HomeScreen from '~features/home/HomeScreen';
import LoginScreen from 'features/login/LoginScreen';
import NoteScreen from 'features/note/NoteScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RootStackParamList from 'navigation/types';
import {AppContext} from 'state/AppContext';
import SplashScreen from 'features/login/SplashScreen';
import {MenuComponent as MenuHome} from 'features/home/components/Menu';

const Stack = createNativeStackNavigator<RootStackParamList>();

const NoteStackNavigator = () => {
  const context = useContext(AppContext);

  if (context.isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName="Login">
      {context.isAuthenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'My Notes',
              headerRight: MenuHome,
            }}
          />
          <Stack.Screen
            name="Note"
            options={{title: ''}}
            component={NoteScreen}
          />
        </>
      ) : (
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
            animationTypeForReplace: 'pop',
          }}>
          {props => <LoginScreen {...props} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default NoteStackNavigator;
