import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Alert from '../layouts/Alert'
import Register from '../auth/Register'
import Login from '../auth/Login'
import UpdateUser from '../auth/UpdateUser'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import Profile from '../profile/Profile'
import Search from '../search/Search'
import UpdatePost from '../post/UpdatePost'
import PrivateRoute from '../routing/PrivateRoute'
import NotFound from './NotFound'

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/posts" component={Posts} />
        <Route exact path="/posts/:id" component={Post} />
        <Route exact path="/posts/:id/edit" component={UpdatePost} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/updateUserInfo" component={UpdateUser} />
        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
