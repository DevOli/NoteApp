import {Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Note'>;

const NoteScreen = (_: Props) => {
  return (
    <View>
      <Text>Write your note</Text>
    </View>
  );
};

export default NoteScreen;
