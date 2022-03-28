import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Card from 'components/molecules/Card';
import {GetAllNotes} from 'services/notes-service';
import Note from 'models/note';
import RootStackParamList from 'navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from 'storage/store'

type Props = {
  style: object;
};

const MyNotesList = (props: Props) => {
  //const [notes, setNotes] = useState<Note[]>([]);
  const notes = useSelector((state: RootState) => state.notes.value);
  const loadNotes = async () => {
    // const allNotes = await GetAllNotes();
    // setNotes(allNotes);
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  console.log(notes);
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
