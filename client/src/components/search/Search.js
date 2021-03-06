import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Post from '../profile/Post'
import Profile from './Profile'

const Search = ({ search: { query, profiles, posts, loading } }) => {
  return (
    <>
      <p className="lead">
        <i className="fas fa-search"></i> Search: "{query}"
      </p>
      <div className="search-grid my-1">
        <div className="search-users">
          <h2 className="text-primary">
            <i className="fas fa-user" />
            Keepers
          </h2>
          {profiles.map(profile => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </div>
        <div className="search-posts">
          <h2 className="text-primary">
            <i className="fas fa-pen" />
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
  search: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  search: state.search,
})

export default connect(mapStateToProps)(Search)
