import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Category from 'models/category';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {CategoryModal} from 'features/category/CategoryModal';

type Props = {
  categories: Category[];
  onSelect: (category: Category) => void;
  selected?: Category;
};

const CategorySelector = ({categories, onSelect, selected}: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Text style={styles.title}>{'Select Category:'}</Text>
      <View style={styles.row}>
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
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setModalVisible(true)}>
          <Icon name="add-circle" size={30} />
        </TouchableOpacity>
      </View>
      <CategoryModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />
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
    flex: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 7,
  },
  row: {
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    padding: 7,
    marginTop: 5,
  },
  badge: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    marginStart: 10,
  },
});
