/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Card from 'components/molecules/Card';
import {GetAllNotes} from 'services/notes-service';
import RootStackParamList from 'navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllNotes, getNotes} from 'storage/notes-slice';

type Props = {
  style: object;
};

const MyNotesList = (props: Props) => {
  const notes = useSelector(selectAllNotes);
  const dispatch = useDispatch();

  const loadNotes = async () => {
    const allNotes = await GetAllNotes();
    dispatch(getNotes(allNotes));
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <ScrollView style={props.style}>
      {notes.map((note, index) => (
        <Card
          key={index}
          image={require('assets/react-logo.png')}
          title={note.title}
          cardDescription={note.content}
          cardStyles={styles.card}
          onPress={() => navigation.navigate('Note', {id: note.id})}
        />
      ))}
    </ScrollView>
  );
};

export default MyNotesList;

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});
