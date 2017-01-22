import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { provideHooks, trigger } from 'redial'
import { Router, Route, hashHistory, Link, IndexRoute, browserHistory, match } from 'react-router'
import { actions as requestActions } from './redux/modules/requests.js'
import LayoutContainer from './containers/LayoutContainer'
import DetailsContainer from './containers/DetailsContainer'
import RequestsContainer from './containers/RequestsContainer'
import createStore from './redux/createStore'

const initialState = {
  loading: false,
  requests: [{'id':1,'title':'Request from Nancy','updated_at':'2015-08-15 12:27:01 -0600','created_at':'2015-08-12 08:27:01 -0600','status':'Denied'}]
}

const reduxStore = createStore(initialState)


const hooks = {
  defer: ({ dispatch }) => dispatch(requestActions.fetchRequests())
}

const hookedRequestsPage = provideHooks(hooks)(RequestsContainer)




const Page2 = () => (
  <h1>Here is page 2</h1>
);

const routes = (
  <Route path='/' component={LayoutContainer}>
    <IndexRoute component={hookedRequestsPage} />
    <Route path='/page2' component={Page2} />
    <Route path='/details/:id' component={DetailsContainer} />
  </Route>
);



const { dispatch } = reduxStore;
// Listen for route changes on the browser history instance:
browserHistory.listen(location => {
  console.log('location', location)
  // Match routes based on location object:
  match({ routes, location }, (error, redirectLocation, renderProps) => {
    // Get array of route handler components:
    const { components } = renderProps

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,

      // Allow lifecycle hooks to dispatch Redux actions:
      dispatch
    };

    // Don't fetch data for initial route, server has already done the work:
    if (window.INITIAL_STATE) {
      // Delete initial data so that subsequent data fetches can occur:
      delete window.INITIAL_STATE;
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      trigger('fetch', components, locals);
    }

    // Fetch deferred, client-only data dependencies:
    trigger('defer', components, locals);
  })

})

//kick off first fetch
browserHistory.push('/');


const App = () => (
  <Provider store={reduxStore}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
);


const render = () => {
  ReactDOM.render(<App />, document.getElementById('container'));
};

reduxStore.subscribe(render);

render();
