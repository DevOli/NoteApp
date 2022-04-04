import {
  configureStore,
  getDefaultMiddleware,
  AnyAction,
} from '@reduxjs/toolkit';
import notes from './notes-slice';
import categories from './category-slice';

const middlewares = getDefaultMiddleware({
  immutableCheck: false,
});

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export type FilterState = {
  value: string;
};

export interface ActionFilter {
  type: 'counter/set';
  filter: string;
}

export const setFilter = (filter: string): ActionFilter => ({
  type: 'counter/set',
  filter: filter,
});

const initialState: FilterState = {
  value: '',
};

function filterReducer(state = initialState, action: AnyAction): FilterState {
  switch (action.type) {
    case 'counter/set':
      return {value: action.filter};
    default:
      return state;
  }
}

let store = configureStore({
  reducer: {
    filterReducer,
    notes,
    categories,
  },
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
