/* eslint-disable react-hooks/exhaustive-deps */
import {Alert, StyleSheet, TextInput} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import RootStackParamList from 'navigation/types';
import TextEditor from './components/TextEditor';
import {useDispatch, useSelector} from 'react-redux';
import {selectNoteById} from 'storage/notes-slice';
import {RootState} from 'storage/store';
import {Button} from 'components/molecules/Button';
import CategorySelector from './components/CategorySelector';
import {
  subscribeToCategories,
  updateNote,
  deleteNote,
  deleteCategory,
} from 'services';
import {addCategories, selectAllCategories} from 'storage/category-slice';
import {MenuComponent as MenuNote} from 'features/note/components/Menu';
import Category from 'models/category';

type Props = NativeStackScreenProps<RootStackParamList, 'Note'>;

const NoteScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) =>
    selectNoteById(state, route.params.id),
  );
  const categories = useSelector(selectAllCategories);
  const [category, setCategory] = useState(note?.category);
  const contentRef = useRef(note?.content);
  const [title, onChangeTitle] = useState(note?.title);
  const [clear, onClear] = useState(false);

  const handleSave = () => {
    if (note) {
      const newNote = {
        ...note,
        title: title || '',
        content: contentRef.current || '',
        categoryId: category?.id || '',
      };
      updateNote(newNote).then(_result =>
        Alert.alert('Notes', 'The changes have been saved', [
          {
            text: 'Ok',
            style: 'default',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]),
      );
      // note.content = 'New content';
      // console.log(note.content);
    }
  };

  const handleDelete = () => {
    note && deleteNote(note.id) && navigation.goBack();
  };

  const handleDeleteCategory = (categoryOld: Category) => {
    Alert.alert('Category', `Do you want to delete '${categoryOld.name}'?`, [
      {text: "Don't do it", style: 'cancel', onPress: () => {}},
      {
        text: 'Do it',
        style: 'destructive',
        onPress: () => {
          deleteCategory(categoryOld.id);
          setCategory(undefined);
        },
      },
    ]);
  };

  const handleClear = () => {
    onClear(true);
    contentRef.current = '';
  };

  const handleChange = useCallback(html => {
    contentRef.current = html;
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () =>
        MenuNote({note, onClear: handleClear, onDelete: handleDelete}),
    });
    const subcriber = subscribeToCategories(data => {
      dispatch(addCategories(data));
    });
    return () => subcriber();
  }, []);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeTitle}
        value={title}
      />
      <TextEditor
        content={contentRef.current}
        handleChange={handleChange}
        clear={clear}
      />
      <CategorySelector
        categories={categories}
        onSelect={setCategory}
        selected={category}
        onLongSelect={handleDeleteCategory}
      />
      <Button text={'Save'} onPress={handleSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 20,
    height: 30,
    margin: 12,
  },
});

export default NoteScreen;
