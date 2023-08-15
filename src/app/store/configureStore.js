import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';

export default function configureStore() {
  const enhancer = compose(applyMiddleware(thunk));
  const store = createStore(reducers, enhancer);

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
