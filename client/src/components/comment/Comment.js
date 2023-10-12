import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Avatar from '../avatar/Avatar'
import { deleteComment } from '../../actions/post'
import FormattedDate from '../../utils/formattedDate'
import useDropdown from '../../hooks/useDropdown'
import Dropdown from '../utils/Dropdown'

const Comment = ({
  auth: { loading, user },
  comment,
  deleteComment,
  postAuthor,
}) => {
  const { isDropdownOpen, dropdownRef, toggleDropdown } = useDropdown()

  const onDelete = () => {
    deleteComment(comment.id)
  }

  return (
    <div
      className={`flex flex-row p-1 my-1 bg-white ${
        isDropdownOpen ? '' : 'hover:bg-violet-50'
      }`}
      id={comment.id}
    >
      <div className="m-3 w-45px">
        <Link to={`/profile/${comment.author.id}`}>
          <Avatar avatar={comment.author.avatar} className="round-img" />
        </Link>
      </div>
      <div className="relative w-full">
        <div>
          <div className="flex gap-2">
            <h4 className="font-bold">{comment.author.name}</h4>
            <FormattedDate timestamp={comment.createdAt} format="MMM d" />
          </div>

          <p className="my-1">{comment.text}</p>
        </div>
        <div className="absolute top-0 right-0">
          <Dropdown
            isOpen={isDropdownOpen}
            toggle={toggleDropdown}
            ref={dropdownRef}
            top
            left
          >
            {!loading &&
              user &&
              (comment.author.id === user.id || postAuthor === user.id) && (
                <>
                  <div className="btn btn-danger" onClick={onDelete}>
                    <i className="fas fa-times" /> Delete
                  </div>
                </>
              )}
          </Dropdown>
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
