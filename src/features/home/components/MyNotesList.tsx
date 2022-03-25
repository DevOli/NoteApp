import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from 'components/molecules/Card';
import {GetAllGroups} from 'services/notes-service';
import Note from 'models/note';
import {useNavigation} from '@react-navigation/native';
import RootStackParamList from 'navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type Props = {
  style: object;
};

const MyNotesList = (props: Props) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const loadNotes = async () => {
    const allNotes = await GetAllGroups();
    setNotes(allNotes);
  };

  useEffect(() => {
    loadNotes();
  }, []);

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
