import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../actions/post'
import { setAlert } from '../../actions/alert'

const CreatePost = ({ auth, createPost, setAlert }) => {
  const navigate = useNavigate()
  const initialState = {
    title: '',
    body: '',
    published: true,
    allowComments: true,
  }

  const [formData, setFormData] = useState(initialState)
  const [disabledComment, toggleDisabledComment] = useState(false)

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { title, body, published, allowComments } = formData

  const onSubmit = (e) => {
    e.preventDefault()
    if (!title && !body) {
      return setAlert("Don't leave all blank (Fill at least one)", 'danger')
    }
    createPost(
      {
        ...formData,
        allowComments: published && allowComments,
      },
      (postId) => {
        navigate(`/posts/${postId}`)
      },
    )
    setFormData(initialState)
    toggleDisabledComment(true)
  }

  return (
    <div className="post-form">
      <div className="text-gray-800 bg-purple-300 rounded-lg post-form-header">
        <h3>Say Something...</h3>
      </div>
      {auth.isAuthenticated ? (
        <form className="my-1 form" onSubmit={(e) => onSubmit(e)}>
          <textarea
            cols="30"
            rows="1"
            placeholder="Post title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Create a post"
            name="body"
            value={body}
            onChange={(e) => onChange(e)}
          />
          <input
            type="checkbox"
            name="published"
            checked={published}
            value={published}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.checked })
              toggleDisabledComment(!disabledComment)
            }}
          />
          <label htmlFor="publish"> Publish </label>
          <input
            type="checkbox"
            name="allowComments"
            checked={allowComments}
            value={allowComments}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.checked })
            }}
            disabled={disabledComment}
          />
          <label htmlFor="allowComments"> allow comments</label>
          <div />
          <input type="submit" value="Submit" className="my-1 btn btn-dark" />
        </form>
      ) : (
        <div className="p-1 bg-light">{!auth.loading && 'Login first...'}</div>
      )}
    </div>
  )
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { createPost, setAlert })(CreatePost)
