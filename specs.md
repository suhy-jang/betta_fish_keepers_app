# Betta-fish-keepers Backend API Specifications

Create the backend for a Betta-fish-keepers community. All of the functionality below needs to be fully implemented in this project.

### Posts

- List all posts in the database
  - Pagination
  - Search by keywords in result
  - Limit number of results
  - Order by fields
- Get single post
  - Author email should be hidden for the other users
- Create new post
  - Authenticated users only
  - Field validation via Prisma
- Update posts
  - Owner only
  - Enable / Disable comments
  - Validation on update
- Delete post
  - Owner only

### Comments

- List all comments in general, for a post
  - Pagination, Keyword-search, etc
- Create a comment
  - Authenticated users only
- Update comment
  - Owner only
- Delete comment
  - Comment owner
  - Post author

### Users & Authentication

- Authentication will be done using JWT
  - JWT should expire in 24 hours
- User registration
  - Once registered, a token will be sent along with user info
  - Passwords must be hashed
- User login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with user info
- Get me
  - Get info of currently logged in user (via token)
- Update user info, Delete user
  - Authenticated user only
- Users index
  - Allow public search by name
- List created posts, pinned posts, featured post for each user
  - Post author can feature a post and should be only one
  - Every user can have any pinned posts up to 6

## Security

- Encrypt passwords and reset tokens
- Prevent cross site scripting - XSS
- Prevent NoSQL injections
- Add a rate limit for requests of 100 requests per 10 minutes
- Protect against http param polution
- Add headers for security (helmet)
- Use cors to make API public (for now)

## Test

- Test with jest

## Documentation

- Use Postman to create documentation

## Deployment (Heroku)

- Create dev, prod server
- Create a new heroku app for Graphql playground

## Code Related Suggestions

- NPM scripts for dev and production env
- Config file for important constants
- Use query, mutation, subscription methods with documented descriptions
- Authentication method to give permission
- Validation using Prisma and no external libraries
- Use async/await for prisma CRUD
- Use resolver using fragment to clean up query methods
