import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost, getPost } from '../../actions/post'
import { setAlert } from '../../actions/alert'
import TextInput from '../utils/TextInput'
import CheckBox from '../utils/CheckBox'

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

  const onChange = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    },
    [formData],
  )

  const onSubmit = useCallback(
    (e) => {
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
    },
    [formData],
  )

  return (
    <div className="post-form">
      {!auth.loading && auth.isAuthenticated && !loading && (
        <form className="my-1 form" onSubmit={(e) => onSubmit(e)}>
          <TextInput
            name="title"
            value={title}
            onChange={onChange}
            placeholder="Title"
            className="mb-2"
          />
          <TextInput
            name="body"
            value={body}
            onChange={onChange}
            placeholder="Say Something..."
            isTextArea={true}
          />
          <CheckBox
            name="published"
            checked={published}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.checked })
              toggleDisabledComment(!disabledComment)
            }}
            label="Publish"
          />
          <CheckBox
            name="allowComments"
            checked={allowComments && !disabledComment}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.checked })
            }}
            label="allow comments"
            disabled={disabledComment}
          />
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
