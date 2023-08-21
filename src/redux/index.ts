import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// Essa tag é para o cypress conseguir acessar o REDUX
if (window.Cypress) {
  window.store = store;
}

export default store;
