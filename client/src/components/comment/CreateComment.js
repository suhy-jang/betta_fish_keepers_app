import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { animateScroll as scroll } from 'react-scroll'
import { connect } from 'react-redux'
import { createComment } from '../../actions/post'

const CreateComment = ({ auth, createComment, postId }) => {
  const [text, setText] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    await createComment({ text, postId })
    setText('')
    setTimeout(() => scroll.scrollToBottom(), 1000)
  }

  const onChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className="my-5 post-form">
      <div className="p-1 text-purple-900 bg-purple-200 p">
        <h3>Leave A Comment...</h3>
      </div>
      {!auth.loading && auth.isAuthenticated ? (
        <form className="my-1 form" onSubmit={(e) => onSubmit(e)}>
          <textarea
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            name="text"
            value={text}
            onChange={(e) => onChange(e)}
          />
          <input
            type="submit"
            className="my-1 bg-purple-300 btn hover:bg-purple-700"
            value="Submit"
          />
        </form>
      ) : (
        <div className="p-1 bg-light">Login first...</div>
      )}
    </div>
  )
}

CreateComment.propTypes = {
  createComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { createComment })(CreateComment)
