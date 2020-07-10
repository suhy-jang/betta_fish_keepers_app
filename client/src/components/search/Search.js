import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Post from '../profile/Post'
import Profile from './Profile'

const Search = ({ profile: { profiles, loading } }) => {
  const posts = [
    {
      id: '1',
      title: 'abc',
      body:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: {
        id: 'zxcv',
        name: 'zxcvasdf',
      },
      comments: [],
      pinGazers: [],
      featuredBy: null,
    },
  ]
  return (
    <>
      <p className="lead">
        <i className="fas fa-search"></i> Search: "all"
      </p>
      <div className="search-grid my-1">
        <div className="search-users">
          <h2 className="text-primary">
            <i className="fas fa-user"></i>
          </h2>
          {profiles.map(profile => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </div>
        <div className="search-posts">
          <h2 className="text-primary">
            <i className="fas fa-pen"></i>
            Posts
          </h2>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}

Search.propTypes = {
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
})

export default connect(mapStateToProps)(Search)
