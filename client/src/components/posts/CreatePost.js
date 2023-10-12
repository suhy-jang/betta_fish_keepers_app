import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../actions/post'
import { setAlert } from '../../actions/alert'
import TextInput from '../utils/TextInput'
import CheckBox from '../utils/CheckBox'

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
      {auth.isAuthenticated ? (
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
