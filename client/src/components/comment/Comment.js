import React, { useState } from 'react'
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
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  // const onDelete = (e) => {
  //   deleteComment(comment.id)
  // }

  return (
    <div
      className={`flex flex-row p-1 my-1 bg-white ${
        isDropDownOpen ? '' : 'hover:bg-violet-50'
      }`}
      id={comment.id}
    >
      <div className="m-3 w-45px">
        <Link to={`/profile/${comment.author.id}`}>
          <Avatar avatar={comment.author.avatar} className="round-img" />
        </Link>
      </div>
      <div className="flex flex-grow">
        <div className="flex-grow">
          <h4 className="font-bold">{comment.author.name}</h4>

          <p className="my-1">{comment.text}</p>
          <p className="post-date">
            Posted on <Moment format="YYYY/MM/DD">{comment.createdAt}</Moment>
          </p>
        </div>
        <div className="relative inline-block w-45">
          <div className="flex items-center justify-center rounded-full w-7 h-7 hover:bg-violet-200">
            <i
              className="fas fa-ellipsis-h"
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
            ></i>
            {isDropDownOpen && (
              <div className="absolute bottom-0 right-0 z-10 flex flex-col h-48 bg-white rounded-lg shadow-md cursor-pointer w-80">
                {!loading &&
                  user &&
                  (comment.author.id === user.id || postAuthor === user.id) && (
                    <>
                      <div
                        className="p-3 hover:bg-violet-50"
                        onClick={() => console.log(1)}
                      >
                        Edit
                      </div>
                      <div
                        className="p-3 hover:bg-violet-50"
                        onClick={() => console.log(1)}
                      >
                        Delete
                      </div>
                    </>
                  )}
              </div>
            )}
          </div>
        </div>
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
