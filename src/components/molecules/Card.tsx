import {View, StyleSheet, Platform, TouchableOpacity} from 'react-native';
import React from 'react';
import Label from '../atoms/Label';

type CardProps = {
  title: string;
  cardDescription: string;
  cardStyles?: object;
  padding?: number;
  onPress: () => void;
};

export default function Card(props: CardProps) {
  const {title, cardDescription, cardStyles, onPress} = props;

  const accesibilities = {
    accessible: true,
    accessibilityLabel: title,
    accessibilityHint: 'Card',
  };

  // const cardImage = {
  //   image: image,
  //   imageDescription: 'image',
  //   imageStyle: {
  //     height: 100,
  //     borderTopLeftRadius: 8,
  //     borderTopRightRadius: 8,
  //   },
  // };

  const titleStyles = {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    margin: 0,
  };

  const subtitleDescStyles = {
    fontSize: 16,
    color: 'black',
    margin: 0,
  };

  return (
    <TouchableOpacity
      style={[styles.container, cardStyles]}
      onPress={onPress}
      {...accesibilities}>
      {/* <ImageAtom {...cardImage} /> */}
      <View style={styles.cardBody}>
        <View style={styles.title}>
          <Label textStyle={titleStyles} text={title} />
        </View>
        <View style={styles.description}>
          <Label textStyle={subtitleDescStyles} text={cardDescription} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
  },
  ...Platform.select({
    ios: {
      container: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        borderRadius: 8,
      },
    },
    android: {
      container: {
        margin: 5,
        elevation: 2,
        shadowRadius: 20,
        shadowColor: 'black',
        borderRadius: 8,
      },
    },
  }),
  cardBody: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 8,
    // borderBottomLeftRadius: 8,
    // borderBottomRightRadius: 8,
  },
  title: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  description: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
});
