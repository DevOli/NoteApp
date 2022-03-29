import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useContext} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'navigation/types';
import {AppContext} from 'state/AppContext';
import {save} from 'storage/secure-store';
import {tokenStore} from 'utility/constants';
import Token from 'models/token';
import {black, white} from 'styles/colors';
import {findUserByEmail} from 'services';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = (_: Props) => {
  const context = useContext(AppContext);
  const [inputEmail, onChangeInputEmail] = React.useState('');
  const [showError, onError] = React.useState(false);

  const onLoging = async () => {
    const user = await findUserByEmail(inputEmail.toLowerCase());
    if (user) {
      const userInfo: Token = {
        name: user.name,
      };
      await save(tokenStore, userInfo);
      context.login();
    } else {
      onError(true);
    }
  };

  const onLogginGoogle = async () => {
    await GoogleSignin.hasPlayServices();
    const credentials = await GoogleSignin.signIn();
    onChangeInputEmail(credentials.user.email);
    const user = await findUserByEmail(credentials.user.email.toLowerCase());
    if (user) {
      const userInfo: Token = {
        name: user.name,
      };
      await save(tokenStore, userInfo);
      context.login();
    } else {
      onError(true);
    }
  };

  const display = showError ? 'flex' : 'none';

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to NotesApp</Text>
      <View style={styles.centeredButton}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeInputEmail}
          value={inputEmail}
          placeholder="Enter your email"
        />
        <Text style={[styles.errorText, {display}]}>Wrong email</Text>
        <Button title="Login" color="black" onPress={onLoging} />
        <GoogleSigninButton onPress={onLogginGoogle} />
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
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  input: {
    width: '50%',
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});
