/* eslint-disable react-hooks/exhaustive-deps */
import {StyleSheet} from 'react-native';
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
import {subscribeToCategories} from 'services';
import {addCategories, selectAllCategories} from 'storage/category-slice';

type Props = NativeStackScreenProps<RootStackParamList, 'Note'>;

const NoteScreen = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const note = useSelector((state: RootState) =>
    selectNoteById(state, route.params.id),
  );

  const categories = useSelector(selectAllCategories);

  const [category, setCategory] = useState(note?.category);

  const contentRef = useRef(note?.content);
  const handleSave = () => {
    console.log(contentRef.current);
    console.log(category);
  };

  const handleChange = useCallback(html => {
    contentRef.current = html;
  }, []);

  useEffect(() => {
    navigation.setOptions({title: note?.title});
    const subcriber = subscribeToCategories(data => {
      dispatch(addCategories(data));
    });
    return () => subcriber();
  }, []);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <TextEditor content={note?.content} handleChange={handleChange} />
      <CategorySelector
        categories={categories}
        onSelect={setCategory}
        selected={category}
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
});

export default NoteScreen;
