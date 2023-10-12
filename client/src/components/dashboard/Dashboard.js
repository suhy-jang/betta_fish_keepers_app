import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import Post from '../posts/Post'
import { deleteUser } from '../../actions/auth'
import { getMyPosts } from '../../actions/post'

const Dashboard = ({
  auth: { loading: userLoading, user },
  post: { loading: postLoading, myPosts },
  getMyPosts,
  deleteUser,
}) => {
  const navigate = useNavigate()

  useEffect(() => {
    getMyPosts()
  }, [getMyPosts])

  const onClickDeleteUser = () => {
    deleteUser(() => {
      navigate('/')
    })
  }

  if (!user) {
    return null
  }

  return userLoading ? (
    <>loading...</>
  ) : (
    <>
      <h1 className="text-purple-800 large">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user.name}
      </p>
      <div className="dash-buttons">
        <Link to={`/profile/${user.id}`} className="mr-2 btn btn-light">
          <i className="text-purple-800 fas fa-user-circle" /> View Profile
        </Link>
        <Link to="/updateUserInfo" className="btn btn-light">
          <i className="text-purple-800 fas fa-user-circle" /> Edit User Info
        </Link>
      </div>

      <div className="profile-posts min-h-[250px] mt-7 mb-5">
        <h2 className="my-1 text-dark">
          <i className="fas fa-pen" /> My Posts
        </h2>
        {user &&
          !postLoading &&
          myPosts.length > 0 &&
          myPosts.map((post) => <Post key={post.id} post={post} user={user} />)}
      </div>
      <div className="my-2">
        <button
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm('Are you sure?')) {
              deleteUser(() => {
                navigate('/')
              })
            }
          }}
        >
          <i className="fas fa-user-minus" onClick={onClickDeleteUser} /> Delete
          My Account
        </button>
      </div>
    </>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps, { deleteUser, getMyPosts })(Dashboard)
