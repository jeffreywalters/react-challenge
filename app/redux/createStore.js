import { applyMiddleware, createStore, combineReducers, compose } from 'redux'
import rootReducer from './modules/requests'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'


const statusFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type){
    case ('SET_STATUS_FILTER'):
      return action.filter
    default:
      return state
  }
}

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
