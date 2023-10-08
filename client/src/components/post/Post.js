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

const Post = ({ auth: { user }, post: { post, loading }, getPost }) => {
  const { id } = useParams()
  const { pinPost, unpinPost } = usePin()
  const { featurePost, unfeaturePost } = useFeature()

  useEffect(() => {
    getPost(id)
  }, [id])

  return loading ? (
    <>loading...</>
  ) : (
    <div className="post-page">
      <div className="post-top">
        <a href="/posts" className="bg-purple-300 btn hover:bg-purple-700">
          Go All Posts
        </a>
        <div className="buttons">
          {user && post && (
            <>
              <Feature
                user={user}
                post={post}
                featurePost={featurePost}
                unfeaturePost={unfeaturePost}
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
        <div className="p-1">
          <div className="text-gray-800 post-title">{post.title}</div>
          <p className="my-1">{post.body}</p>
          <div className="post-date">
            {!post.published && !loading && 'Temporiry saved'}
          </div>
          {post.id && (
            <PrivateButtons postId={post.id} authorId={post.author.id} />
          )}
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
