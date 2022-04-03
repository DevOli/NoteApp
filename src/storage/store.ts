import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import notes from './notes-slice';
import categories from './category-slice';

const middlewares = getDefaultMiddleware({
  immutableCheck: false,
});

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

function counterReducer(state = {value: 0}, action: any) {
  switch (action.type) {
    case 'counter/incremented':
      return {value: state.value + 1};
    case 'counter/decremented':
      return {value: state.value - 1};
    default:
      return state;
  }
}

let store = configureStore({
  reducer: {
    counterReducer,
    notes,
    categories,
  },
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
