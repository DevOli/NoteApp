/* eslint-disable react-hooks/exhaustive-deps */
import {ActivityIndicator, Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useContext, useEffect} from 'react';
import {getObject} from 'storage/secure-store';
import Token from 'models/token';
import {tokenStore} from 'utility/constants';
import {AppContext} from 'state/AppContext';
import {black, white} from 'styles/colors';

type Props = {};

const SplashScreen = (_: Props) => {
  const {login, setIsLoading} = useContext(AppContext);

  const loadComponent = async () => {
    const token = await getObject<Token>(tokenStore);

    if (token) {
      login();
    }
    setTimeout(() => setIsLoading(false), 4000);
  };

  useEffect(() => {
    loadComponent();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>NotesApp</Text>
      <Image
        style={styles.imageStyle}
        resizeMode={'contain'}
        source={require('assets/onboarding.png')}
      />
      <ActivityIndicator style={styles.activity} size={'large'} color={white} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: black,
  },
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    backgroundColor: black,
  },
  activity: {
    marginBottom: 30,
  },
  text: {
    color: white,
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: black,
  },
});

export default SplashScreen;
