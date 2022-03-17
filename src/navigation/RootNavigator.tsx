import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import NoteStackNavigator from './NoteStackNavigator';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <NoteStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;
