/* eslint-disable react-hooks/exhaustive-deps */
import {Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {getObject} from 'storage/secure-store';
import Token from 'models/token';
import {tokenStore} from 'utility/constants';
import {AppContext} from 'state/AppContext';

type Props = {};

const SplashScreen = (_: Props) => {
  const {login, setIsLoading} = useContext(AppContext);

  const loadComponent = async () => {
    const token = await getObject<Token>(tokenStore);

    if (token) {
      login();
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadComponent();
  }, []);

  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
