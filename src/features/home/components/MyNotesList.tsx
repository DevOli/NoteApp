/* eslint-disable react-hooks/exhaustive-deps */
import {ScrollView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

import Card from 'components/molecules/Card';
import RootStackParamList from 'navigation/types';
import {useDispatch, useSelector} from 'react-redux';
import {selectAllNotes, getNotes, addNotes} from 'storage/notes-slice';
import {subscribeToNotes} from 'services';

type Props = {
  style: object;
};

const MyNotesList = (props: Props) => {
  const notes = useSelector(selectAllNotes);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadNotes = async () => {
    dispatch(getNotes());
  };

  useEffect(() => {
    //loadNotes();
    const subcriber = subscribeToNotes(notesData => {
      dispatch(addNotes(notesData));
    });
    return () => subcriber();
  }, []);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  return (
    <ScrollView style={props.style}>
      {notes.map((note, index) => (
        <Card
          key={index}
          title={note.title}
          color={note.category?.color}
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
