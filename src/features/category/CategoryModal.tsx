import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';

type Props = {
  setModalVisible: (data: boolean) => void;
  modalVisible: boolean;
};

export const CategoryModal = ({setModalVisible, modalVisible}: Props) => {
  const [name, onChangeName] = React.useState('');
  const [color, onChangeColor] = React.useState('');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>New Category</Text>
          <TextInput
            style={styles.inputName}
            onChangeText={onChangeName}
            value={name}
            placeholder="Category name"
          />
          <TextInput
            style={styles.inputName}
            onChangeText={onChangeColor}
            value={color}
            placeholder="Category color"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Save</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 24,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputName: {
    minWidth: '80%',
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
