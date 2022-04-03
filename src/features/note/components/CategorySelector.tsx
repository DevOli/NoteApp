import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Category from 'models/category';

type Props = {
  categories: Category[];
  onSelect: (category: Category) => void;
  selected?: Category;
};

const CategorySelector = ({categories, onSelect, selected}: Props) => {
  return (
    <>
      <Text style={styles.title}>{'Select Category:'}</Text>
      <View style={styles.container}>
        {categories.map(category => (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category)}
            style={[
              category.id === selected?.id
                ? styles.categorySelected
                : styles.category,
              {backgroundColor: category.color},
            ]}>
            <Text style={styles.badge}>{category?.name}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default CategorySelector;

const styles = StyleSheet.create({
  category: {
    borderRadius: 10,
    padding: 7,
    margin: 5,
    borderColor: 'white',
    borderWidth: 2,
  },
  categorySelected: {
    borderRadius: 10,
    padding: 7,
    margin: 5,
    borderColor: 'blue',
    borderWidth: 2,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 7,
  },
  badge: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    marginStart: 10,
  },
});
