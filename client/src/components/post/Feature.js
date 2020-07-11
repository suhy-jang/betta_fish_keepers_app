// import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// import { createPinned, deletePinned } from '../../actions/post'
//
// const FeaturedPost = { auth, post, createPinned, deletePinned } => {
//   if (auth.loading || post.loading || !auth.isAuthenticated) {
//     return <></>
//   }
//
//   const isFeatured = post.featuredBy ? true : false
//
//   return (auth.isAuthenticated && auth.user.id === post.author.id) && (
//     <button className={`btn btn-${isFeatured ? 'dark' : 'light'} pin`}>
//       <i className="fas fa-asterisk" /> Feature
//     </button>
//   )
// }
//
// FeaturedPost.propTypes = {
//   auth: PropTypes.object.isRequired,
//   post: PropTypes.object.isRequired,
//   createPinned: PropTypes.func.isRequired,
//   deletePinned: PropTypes.func.isRequired,
// }
//
// const mapStateToProps = state => ({
//   auth: state.auth,
//   post: state.post,
// })
//
// export default connect(mapStateToProps, { createPinned, deletePinned })(
//   FeaturedPost,
// )
