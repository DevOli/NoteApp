import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

type Props = {};

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.centeredButton}>
      <Text>LoginScreen</Text>
      <Button
        title="Login"
        color="#841584"
        onPress={() => navigation.navigate('Home')}
      />
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
