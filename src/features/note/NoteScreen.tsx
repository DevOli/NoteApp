import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import RootStackParamList from 'navigation/types';
import TextEditor from './components/TextEditor';

type Props = NativeStackScreenProps<RootStackParamList, 'Note'>;

const NoteScreen = ({route}: Props) => {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <Text>NoteId {route.params.id}</Text>
      <TextEditor />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default NoteScreen;
