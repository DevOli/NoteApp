import {Button, StyleSheet, View} from 'react-native';
import React, {useContext, useState} from 'react';
import RootStackParamList from 'navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppContext} from 'state/AppContext';
import SearchBar from 'react-native-platform-searchbar';
import MyNotesList from './components/MyNotesList';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = (_: Props) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <View style={styles.container}>
      <SearchBar
        value={searchValue}
        onChangeText={setSearchValue}
        style={styles.searchBar}
      />
      <MyNotesList style={styles.scroll} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    margin: 20,
  },
  text: {
    fontSize: 24,
    color: 'black',
  },
  scroll: {
    marginHorizontal: 30,
    marginBottom: 30,
  },
});

export default HomeScreen;
