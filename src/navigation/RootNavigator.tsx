import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NoteStackNavigator from './NoteStackNavigator';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const RootNavigator = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NoteStackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
