import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStackParamList from 'navigation/types';
import {AppContext} from 'state/AppContext';
import {save} from 'storage/secure-store';
import {tokenStore} from 'utility/constants';
import Token from 'models/token';

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
    <View style={styles.centeredButton}>
      <Text>LoginScreen</Text>
      <Button title="Login" color="#841584" onPress={onLoging} />
      <Button title="Sign in" color="#841584" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  centeredButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
