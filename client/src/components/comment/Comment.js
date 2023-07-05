import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import Avatar from '../avatar/Avatar'
import { deleteComment } from '../../actions/post'

const Comment = ({
  auth: { loading, user },
  comment,
  deleteComment,
  postAuthor,
}) => {
  const onClick = (e) => {
    deleteComment(comment.id)
  }

  return (
    <div className="post bg-white p-1 my-1" id={comment.id}>
      <div>
        <Link to={`/profile/${comment.author.id}`}>
          <Avatar avatar={comment.author.avatar} className="round-img" />
          <h4>{comment.author.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{comment.text}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{comment.createdAt}</Moment>
        </p>

        {!loading &&
          user &&
          (comment.author.id === user.id || postAuthor === user.id) && (
            <button
              type="button"
              className="btn btn-danger btn-square rounded-lg"
              onClick={(e) => onClick(e)}
            >
              <i className="fas fa-times" />
            </button>
          )}
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  postAuthor: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { deleteComment })(Comment)
