import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {AppContext} from 'state/AppContext';
import {useDispatch} from 'react-redux';
import {addNote, clearNotes} from 'storage/notes-slice';

export const MenuComponent = () => {
  const context = useContext(AppContext);
  const dispatch = useDispatch();

  const addNewNote = () => {
    dispatch(
      addNote({
        id: Date.now().toString(),
        title: 'Titulo de nueva nota',
        content: 'Contenido d ficha nueva',
      }),
    );
  };

  const clearNotesHandler = () => {
    dispatch(clearNotes());
  };

  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Icon name="more-vert" size={25} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={addNewNote}>
            <Text>{'Add new note'}</Text>
          </MenuOption>
          <MenuOption onSelect={() => console.log('Save')} text="Favorites" />
          <MenuOption onSelect={clearNotesHandler} text="Delete All" />
          <MenuOption onSelect={context.logout} text="Log out" />
        </MenuOptions>
      </Menu>
    </View>
  );
};
