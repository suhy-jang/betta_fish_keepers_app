import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import FormattedDate from '../../utils/formattedDate'
import Avatar from '../avatar/Avatar'
import { usePin } from '../../hooks/usePin'
import { useFeature } from '../../hooks/useFeature'
import Pin from '../post/Pin'
import Feature from '../post/Feature'

const Post = ({ post, user }) => {
  const navigate = useNavigate()
  const { pinPost, unpinPost } = usePin()
  const { featurePost, unfeaturePost } = useFeature()

  const navigateToPost = () => {
    if (post && post.id) {
      navigate(`/posts/${post.id}`)
    }
  }

  return (
    <div
      onClick={navigateToPost}
      className="min-w-full my-1 cursor-pointer btn bg-purple-50 hover:bg-purple-300"
    >
      <div className="flex flex-row bg-white bg-opacity-50">
        <div>
          <div className="m-3 w-45px">
            <Link to={`/profile/${post.author.id}`}>
              <Avatar avatar={post.author.avatar} className="my-1 round-img" />
            </Link>
          </div>
        </div>
        <div className="flex-grow p-1">
          <div className="flex gap-2">
            <h4 className="font-bold">{post.author.name}</h4>
            <FormattedDate timestamp={post.createdAt} format="MMM d" />
          </div>

          <div className="text-lg text-gray-800 post-title">{post.title}</div>
          <p className="my-1 text-wrap pre-line">{post.body}</p>
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
    </div>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Post
