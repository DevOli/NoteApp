import React from 'react';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';

import RootNavigator from 'navigation/RootNavigator';
import {AppContext} from 'state/AppContext';
import {AppState} from 'state/App.state';
import store from 'storage/store';

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
