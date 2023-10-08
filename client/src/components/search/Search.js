import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Post from '../posts/Post'
import Profile from './Profile'

const Search = ({ search: { query, profiles, posts, loading } }) => {
  return (
    <>
      <p className="lead">
        <i className="fas fa-search"></i> Search: "{query}"
      </p>
      <div className="my-1 search-grid">
        <div className="search-users">
          <h2 className="text-purple-800">
            <i className="fas fa-user" />
            Keepers
          </h2>
          {profiles.map((profile) => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </div>
        <div className="search-posts">
          <h2 className="text-purple-800">
            <i className="fas fa-pen" />
            Posts
          </h2>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}

Search.propTypes = {
  search: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  search: state.search,
})

export default connect(mapStateToProps)(Search)
