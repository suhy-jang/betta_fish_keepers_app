import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost, getPost } from '../../actions/post'
import { setAlert } from '../../actions/alert'

const UpdatePost = ({
  auth,
  post: { loading, post },
  updatePost,
  getPost,
  setAlert,
}) => {
  const { id } = useParams()
  const navigate = useNavigate()
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
      published: post.published || false,
      allowComments: (post.published && post.allowComments) || false,
    })
    toggleDisabledComment(!post.published)
    // eslint-disable-next-line
  }, [getPost, post])
  const { title, body, published, allowComments } = formData

  useEffect(() => {
    getPost(id)
  }, [id])

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
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
      (postId) => {
        navigate(`/posts/${postId}`)
      },
    )
    setFormData(initialState)
    toggleDisabledComment(false)
  }

  return (
    <div className="post-form">
      {!auth.loading && auth.isAuthenticated && !loading && (
        <form className="my-1 form" onSubmit={(e) => onSubmit(e)}>
          <textarea
            cols="30"
            rows="1"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            style={{ marginBottom: '1rem' }}
          />
          <textarea
            cols="30"
            rows="5"
            placeholder="Say Something..."
            name="body"
            value={body}
            onChange={(e) => onChange(e)}
          />
          <input
            type="checkbox"
            name="published"
            checked={published}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.checked })
              toggleDisabledComment(!disabledComment)
            }}
          />
          <label htmlFor="publish"> Publish </label>
          <input
            type="checkbox"
            name="allowComments"
            checked={allowComments && !disabledComment}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.checked })
            }}
            disabled={disabledComment}
          />
          <label htmlFor="allowComments"> allow comments</label>
          <div />
          <input type="submit" value="Submit" className="my-1 btn btn-dark" />
        </form>
      )}
      {!auth.loading && !auth.isAuthenticated && (
        <div className="p-1 bg-light">Login first...</div>
      )}
    </div>
  )
}

UpdatePost.propTypes = {
  updatePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps, { updatePost, getPost, setAlert })(
  UpdatePost,
)
