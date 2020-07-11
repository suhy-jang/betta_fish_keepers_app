import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { animateScroll as scroll } from 'react-scroll'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { createComment } from '../../actions/post'

const CreateComment = ({ auth, createComment, postId, history }) => {
  const [text, setText] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    await createComment(text, postId)
    setText('')
    setTimeout(() => scroll.scrollToBottom(), 1000)
  }

  const onChange = e => {
    setText(e.target.value)
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      {!auth.loading && auth.isAuthenticated ? (
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
      ) : (
        <div className="bg-light p-1">Login first...</div>
      )}
    </div>
  )
}

CreateComment.propTypes = {
  createComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { createComment })(
  withRouter(CreateComment),
)
