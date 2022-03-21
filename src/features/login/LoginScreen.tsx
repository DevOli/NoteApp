import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'navigation/types';
import {AppContext} from 'state/AppContext';
import {save} from 'storage/secure-store';
import {tokenStore} from 'utility/constants';
import Token from 'models/token';
import {black, white} from 'styles/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = (_: Props) => {
  const context = useContext(AppContext);

  const onLoging = async () => {
    const userInfo: Token = {
      name: 'Oliver',
    };
    await save(tokenStore, userInfo);
    context.login();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to NotesApp</Text>
      <View style={styles.centeredButton}>
        <Button title="Login Local" color="black" onPress={onLoging} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    backgroundColor: white,
  },
  centeredButton: {
    flex: 1,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
  text: {
    color: black,
    fontSize: 42,
    marginTop: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: white,
  },
});
