import React from 'react';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';

import RootNavigator from 'navigation/RootNavigator';
import {AppContext} from 'state/AppContext';
import {AppState} from 'state/App.state';
import store from 'storage/store';
import {LogBox} from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  const state = AppState();
  return (
    <Provider store={store}>
      <AppContext.Provider value={state.value}>
        <MenuProvider>
          <RootNavigator />
        </MenuProvider>
      </AppContext.Provider>
    </Provider>
  );
};

export default App;
