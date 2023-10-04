import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Alert from '../layouts/Alert'
import Register from '../auth/Register'
import Login from '../auth/Login'
import UpdateUser from '../auth/UpdateUser'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import Profile from '../profile/Profile'
import Dashboard from '../dashboard/Dashboard'
import Search from '../search/Search'
import UpdatePost from '../post/UpdatePost'
import PrivateComponent from '../routing/PrivateComponent'
import NotFound from './NotFound'
import Landing from '../layouts/Landing'

const AppRoutes = () => {
  return (
    <section className="container">
      <Alert />
      <Routes>
        <Route index element={<Landing />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/:id" element={<Post />} />
        <Route path="posts/:id/edit" element={<UpdatePost />} />
        <Route path="search" element={<Search />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route
          path="dashboard"
          element={<PrivateComponent Component={Dashboard} />}
        />
        <Route
          path="updateUserInfo"
          element={<PrivateComponent Component={UpdateUser} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  )
}

export default AppRoutes
