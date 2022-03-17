import {Button, Text, View} from 'react-native';
import React, {useContext} from 'react';
import RootStackParamList from 'navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppContext} from 'state/AppContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const context = useContext(AppContext);
  return (
    <View>
      <Text>Home</Text>
      <Button title="LogOut" onPress={context.logout} />
      <Button title="Go to Notes" onPress={() => navigation.navigate('Note')} />
    </View>
  );
};

export default HomeScreen;
