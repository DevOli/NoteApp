import {View, StyleSheet, Platform, TouchableOpacity, Text} from 'react-native';
import React from 'react';
import Label from '../atoms/Label';
import Category from 'models/category';
// @ts-ignore
import HtmlText from 'react-native-htmltext2';

type CardProps = {
  title: string;
  cardDescription: string;
  category?: Category;
  cardStyles?: object;
  padding?: number;
  onPress: () => void;
};

export default function Card(props: CardProps) {
  const {title, cardDescription, category, cardStyles, onPress} = props;

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

  // const subtitleDescStyles = {
  //   fontSize: 16,
  //   color: 'black',
  //   margin: 0,
  // };

  const display = category?.color ? 'flex' : 'none';
  return (
    <TouchableOpacity
      style={[styles.container, cardStyles]}
      onPress={onPress}
      {...accesibilities}>
      <View style={styles.cardBody}>
        <View style={styles.title}>
          <View
            style={[
              styles.category,
              {display},
              {backgroundColor: category?.color},
            ]}>
            <Text style={styles.badge}>{category?.name}</Text>
          </View>
          <Label textStyle={titleStyles} text={title} />
        </View>
        <View style={styles.description}>
          {/* <Label textStyle={subtitleDescStyles} text={cardDescription} /> */}
          <HtmlText html={cardDescription} />
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
  category: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderBottomStartRadius: 10,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 7,
  },
  badge: {
    color: 'white',
    fontSize: 16,
  },
});
