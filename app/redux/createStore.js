import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import rootReducer from './modules/requests'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'


const statusFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type){
    case ('SET_STATUS_FILTER'):
      return action.filter;
    default:
      return state;
  }
}

/*
const requestsReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      return [
        ...state,
        singleRequestReducer(undefined, action)
      ];
    case 'REMOVE_REQUEST':
      var index = state.findIndex( rqst => rqst.id === +action.id);
      return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
      ];
    case 'CHANGE_STATUS':
      return state.map( st => {return singleRequestReducer(st, action);} );
    default:
      return state
  }
};

const singleRequestReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      return {
        id: action.id,
        title: action.title,
        updated_at: action.updated_at,
        created_at: action.created_at,
        status: action.status
      };
    case 'CHANGE_STATUS':
      if (+state.id !== +action.id) return state;
      return { ...state, status: action.status, updated_at: action.updated_at };
    default: 
      return state;
  }
};


const requestReducers = combineReducers({
  requestsReducer: requestsReducer,
  statusFilter: statusFilter
});
*/


const createRequestStore = (initialState = {}, ...extraMiddleware) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunkMiddleware,
    ...extraMiddleware
  ]
 
  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = []


  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )
/*
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const reducers = require('./rootReducer').default
      store.replaceReducer(reducers)
    })
  }
*/
  return store
}

export default createRequestStore