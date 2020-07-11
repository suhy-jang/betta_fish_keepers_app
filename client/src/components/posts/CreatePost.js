import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from '../../actions/post'

const CreatePost = ({ createPost, history }) => {
  const initialState = {
    title: '',
    body: '',
    published: true,
    allowComments: true,
  }

  const [formData, setFormData] = useState(initialState)

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const { title, body, published, allowComments } = formData

  const onSubmit = e => {
    e.preventDefault()
    createPost(formData)
    setFormData(initialState)
  }

  return (
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Say Something...</h3>
      </div>
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
          value={published}
          onChange={() => {
            setFormData({ ...formData, published: !published })
          }}
        />
        <label htmlFor="publish"> Publish </label>
        <input
          type="checkbox"
          name="allowComments"
          checked={allowComments}
          value={allowComments}
          onChange={() => {
            setFormData({ ...formData, allowComments: !allowComments })
          }}
        />
        <label htmlFor="allowComments"> allow comments</label>
        <div />
        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
  )
}

CreatePost.propTypes = {}

export default connect(null, { createPost })(withRouter(CreatePost))
