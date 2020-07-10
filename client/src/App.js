import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavBar from './components/layouts/NavBar'
import Landing from './components/layouts/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Alert from './components/layouts/Alert'
import UpdateUser from './components/auth/UpdateUser'
import Posts from './components/posts/Posts'
import Post from './components/post/Post'
import Profile from './components/profile/Profile'
import Search from './components/search/Search'
import PrivateRoute from './components/routing/PrivateRoute'
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
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/posts/:id" component={Post} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute
                  exact
                  path="/updateUserInfo"
                  component={UpdateUser}
                />
              </Switch>
            </section>
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App
