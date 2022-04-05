import React from 'react';
import {Share, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import Note from 'models/note';

type Props = {
  note?: Note;
  onClear: () => void;
  onDelete: () => void;
};

export const MenuComponent = ({note, onClear, onDelete}: Props) => {
  const shareContent = {
    title: note?.title || '',
    message: note?.content || '',
  };

  const onSharePress = () => Share.share(shareContent);

  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Icon name="more-vert" size={25} />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption style={styles.menuItem} onSelect={onSharePress}>
            <Text>{'Share'}</Text>
            <Icon name="share" size={18} />
          </MenuOption>
          <MenuOption style={styles.menuItem} onSelect={onClear}>
            <Text>{'Clear'}</Text>
            <Icon name="clear" size={18} />
          </MenuOption>
          <MenuOption style={styles.menuItem} onSelect={onDelete}>
            <Text>{'Delete'}</Text>
            <Icon name="delete" size={18} />
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
});
