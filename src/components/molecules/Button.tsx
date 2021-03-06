import React from 'react';
import {TouchableHighlight, StyleSheet, Platform} from 'react-native';
import Label from '../atoms/Label';

type Props = {
  text: string;
  fontSize?: number;
  color?: string;
  onPress?: () => void;
};

export const Button = (props: Props) => {
  const {text, fontSize, color, onPress} = props;

  return (
    <TouchableHighlight
      style={[styles.container, {borderColor: color}]}
      onPress={onPress}>
      <Label
        text={text.toUpperCase()}
        textStyle={[styles.label, {fontSize, color}]}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    backgroundColor: '#F3F4F7',
    margin: 10,
    paddingStart: 16,
    paddingEnd: 16,
    ...Platform.select({
      android: {
        elevation: 15,
        shadowColor: '#000000',
      },
      ios: {
        shadowColor: '#071717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 3,
      },
    }),
  },
  label: {
    fontWeight: '500',
  },
});
