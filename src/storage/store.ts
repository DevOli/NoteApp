import {applyMiddleware, createStore} from 'redux';

const middlewares = [
  /* other middlewares */
];

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

let store = createStore(counterReducer, applyMiddleware(...middlewares));

export default store;
