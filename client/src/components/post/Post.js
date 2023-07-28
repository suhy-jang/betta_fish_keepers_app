import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import Avatar from '../avatar/Avatar'
import Comment from '../comment/Comment'
import CreateComment from '../comment/CreateComment'
import PrivateButtons from './PrivateButtons'
import Feature from './Feature'
import Pin from './Pin'
import { getPost } from '../../actions/post'

const Post = ({
  auth: { loading: userLoading, user },
  post: { post, loading },
  userId,
  getPost,
  match,
}) => {
  useEffect(() => {
    getPost(match.params.id)
    // eslint-disable-next-line
  }, [userLoading, match.params.id])

  return (
    <div className="post-page">
      <div className="post-top">
        <a
          href="/posts"
          className="bg-purple-300 rounded-lg btn hover:bg-purple-700"
        >
          Go All Posts
        </a>
        <div className="buttons">
          <Feature />
          {/* TODO: feature only user's post */}
          <Pin />
        </div>
      </div>
      <div className="p-1 my-1 bg-white">
        <Link to={`/profile/${post.author.id}`}>
          <div className="flex items-center">
            <Avatar
              avatar={post.author.avatar}
              className="m-3 round-img w-45px"
            />
            <h4>{post.author.name}</h4>
          </div>
        </Link>
        <div className="p-1">
          <div className="text-gray-800 post-title">{post.title}</div>
          <p className="my-1">{post.body}</p>
          <div className="post-date">
            {post.published ? (
              post.createdAt && (
                <>
                  Posted on{' '}
                  <Moment format="YYYY/MM/DD">{post.createdAt}</Moment>
                </>
              )
            ) : (
              <>{!loading && 'Temporiry saved'}</>
            )}
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
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
})

export default connect(mapStateToProps, { getPost })(Post)
