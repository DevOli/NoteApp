import React, {useContext} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {AppContext} from 'state/AppContext';

export const MenuComponent = () => {
  const context = useContext(AppContext);
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Icon name="more-vert" size={25} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => console.log('Save')} text="New note" />
          <MenuOption onSelect={() => console.log('Save')} text="Favorites" />
          <MenuOption onSelect={() => console.log('Save')} text="Delete All" />
          <MenuOption onSelect={context.logout} text="Log out" />
        </MenuOptions>
      </Menu>
    </View>
  );
};
