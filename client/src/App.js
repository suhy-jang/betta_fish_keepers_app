import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/layouts/NavBar'
import Landing from './components/layouts/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layouts/Alert'
import UpdateUser from './components/auth/UpdateUser'
import { Provider } from 'react-redux'
import { loadUser } from './actions/auth'
import store from './utils/store'
import './App.css'

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
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/updateUserInfo" component={UpdateUser} />
              </Switch>
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
