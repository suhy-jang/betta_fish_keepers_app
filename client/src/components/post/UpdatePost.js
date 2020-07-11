import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { updatePost, getPost } from '../../actions/post'
import { setAlert } from '../../actions/alert'

const UpdatePost = ({
  auth,
  post: { post, loading },
  updatePost,
  getPost,
  setAlert,
  history,
  match,
}) => {
  const initialState = {
    title: '',
    body: '',
    published: false,
    allowComments: false,
  }

  const [formData, setFormData] = useState(initialState)
  const [disabledComment, toggleDisabledComment] = useState(false)

  useEffect(() => {
    setFormData({
      title: post.title || '',
      body: post.body || '',
      published: post.published || '',
      allowComments: (post.published && post.allowComments) || '',
    })
    toggleDisabledComment(!post.published)
    // eslint-disable-next-line
  }, [getPost, post])
  const { title, body, published, allowComments } = formData

  useEffect(() => {
    getPost(match.params.id)
  }, [auth.loading, auth.isAuthenticated, getPost, match.params.id])

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = e => {
    e.preventDefault()
    if (!title && !body) {
      return setAlert("Don't leave all blank (Fill at least one)", 'danger')
    }
    updatePost(
      post.id,
      {
        ...formData,
        allowComments: published && allowComments,
      },
      history,
      '/posts/',
    )
    setFormData(initialState)
    toggleDisabledComment(false)
  }

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Say Something...</h3>
      </div>
      {!auth.loading && auth.isAuthenticated ? (
        <form className="form my-1" onSubmit={e => onSubmit(e)}>
          <textarea
            cols="30"
            rows="1"
            placeholder="Post title"
            name="title"
            value={title}
            onChange={e => onChange(e)}
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Create a post"
            name="body"
            value={body}
            onChange={e => onChange(e)}
          />
          <input
            type="checkbox"
            name="published"
            checked={published}
            onChange={e => {
              // onChange(e)
              setFormData({ ...formData, [e.target.name]: e.target.checked })
              toggleDisabledComment(!disabledComment)
            }}
          />
          <label htmlFor="publish"> Publish </label>
          <input
            type="checkbox"
            name="allowComments"
            checked={allowComments && !disabledComment}
            onChange={e => {
              setFormData({ ...formData, [e.target.name]: e.target.checked })
            }}
            disabled={disabledComment}
          />
          <label htmlFor="allowComments"> allow comments</label>
          <div />
          <input type="submit" value="Submit" className="btn btn-dark my-1" />
        </form>
      ) : (
        <div className="bg-light p-1">Login first...</div>
      )}
    </div>
  )
}

UpdatePost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps, { updatePost, getPost, setAlert })(
  withRouter(UpdatePost),
)
