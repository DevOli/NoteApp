import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import RootStackParamList from 'navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchBar from 'react-native-platform-searchbar';
import MyNotesList from './components/MyNotesList';
import {useDispatch} from 'react-redux';
import {setFilter} from 'storage/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen = (_: Props) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (searchText: string) => {
    dispatch(setFilter(searchText));
    setSearchValue(searchText);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchValue}
        onChangeText={handleSearch}
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
