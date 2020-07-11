import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createComment } from '../../actions/post'

const CreateComment = ({ createComment, postId }) => {
  const [text, setText] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    createComment(text, postId)
    setText('')
  }

  const onChange = e => {
    setText(e.target.value)
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        <textarea
          cols="30"
          rows="5"
          placeholder="Comment on this post"
          name="text"
          value={text}
          onChange={e => onChange(e)}
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
}

CreateComment.propTypes = {
  createComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
}

export default connect(null, { createComment })(CreateComment)
