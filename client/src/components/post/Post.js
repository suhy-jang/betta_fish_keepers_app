import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../avatar/Avatar'
import Comment from '../comment/Comment'
import CreateComment from '../comment/CreateComment'
import PrivateButtons from './PrivateButtons'
import Feature from './Feature'
import Pin from './Pin'
import { getPost } from '../../actions/post'
import FormattedDate from '../../utils/formattedDate'
import { usePin } from '../../hooks/usePin'
import { useFeature } from '../../hooks/useFeature'
import useDropdown from '../../hooks/useDropdown'
import Dropdown from '../utils/Dropdown'

const Post = ({ auth: { user }, post: { post, loading }, getPost }) => {
  const { id } = useParams()
  const { pinPost, unpinPost } = usePin()
  const { featurePost, unfeaturePost } = useFeature()
  const { isDropdownOpen, dropdownRef, toggleDropdown } = useDropdown()

  useEffect(() => {
    getPost(id)
  }, [id])

  return loading ? (
    <>loading...</>
  ) : (
    <div className="post-page">
      <div className="post-top">
        <Link to="/posts" className="bg-purple-300 btn hover:bg-purple-700">
          Go All Posts
        </Link>
        <div className="buttons">
          {user && post && (
            <>
              <Feature
                user={user}
                post={post}
                featurePost={featurePost}
                unfeaturePost={unfeaturePost}
                className="mr-2"
              />
              <Pin
                user={user}
                post={post}
                pinPost={pinPost}
                unpinPost={unpinPost}
              />
            </>
          )}
        </div>
      </div>
      <div className="p-1 my-1 bg-white">
        <div className="relative">
          <div className="absolute top-0 right-0">
            <Dropdown
              isOpen={isDropdownOpen}
              toggle={toggleDropdown}
              ref={dropdownRef}
              top
              left
            >
              {post.id && user && user.id === post.author.id && (
                <PrivateButtons postId={post.id} authorId={post.author.id} />
              )}
            </Dropdown>
          </div>
        </div>
        <Link to={`/profile/${post.author.id}`}>
          <div className="flex items-center">
            <Avatar
              avatar={post.author.avatar}
              className="m-3 round-img w-45px"
            />
            <div className="flex gap-2">
              <h4>{post.author.name}</h4>
              {post.published && post.createdAt && (
                <FormattedDate timestamp={post.createdAt} format="MMM d" />
              )}
            </div>
          </div>
        </Link>
        <div className="p-2">
          <div className="text-lg text-gray-800 post-title">{post.title}</div>
          <p className="my-1 text-wrap pre-line">{post.body}</p>
          <div className="post-date">
            {!post.published && !loading && 'Temporiry saved'}
          </div>
        </div>
      </div>
      {post.published && post.allowComments ? (
        <CreateComment postId={post.id} />
      ) : (
        <div className="p-1 bg-light">
          {!loading && "Author doesn't allow comments..."}
        </div>
      )}
      <div className="comments">
        {post.comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            postAuthor={post.author.id}
          />
        ))}
      </div>
    </div>
  )
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
})

export default connect(mapStateToProps, {
  getPost,
})(Post)
