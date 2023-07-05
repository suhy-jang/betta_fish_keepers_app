import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/layouts/NavBar'
import Landing from './components/layouts/Landing'
import Routes from './components/routing/Routes'
import { Provider } from 'react-redux'
import { loadUser } from './actions/auth'
import store from './utils/store'
import './App.css'
import './tailwind.css'

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
