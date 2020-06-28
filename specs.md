# Betta-fish-keepers Backend API Specifications

Create the backend for a Betta-fish-keepers community. All of the functionality below needs to be fully implmented in this project.

### Posts

- List all posts in the database
  - Pagination
  - Search by keywords in result
  - Limit number of results
  - Order by fields
- Get single post
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

- Authentication will be done using JWT/cookies
  - JWT and cookie should expire in 24 hours
- User registration
  - Register as a "user"
  - Once registered, a token will be sent along with a cookie (token = xxx)
  - Passwords must be hashed
- User login
  - User can login with email and password
  - Plain text password will compare with stored hashed password
  - Once logged in, a token will be sent along with a cookie (token = xxx)
- User logout
  - Cookie will be sent to set token = none
- Get user
  - Route to get the currently logged in user (via token)
- Update user info, Delete user
  - Authenticated user only
- Users index
  - Allow public search with hidden email
- List created posts, pinned posts, featured post for each user
  - featured post is written by same user and should be only one
  - pinned posts are written by anyone and the list can be up to 6

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

- Push to Github
- Clone repo on to server

## Code Related Suggestions

- NPM scripts for dev and production env
- Config file for important constants
- Use controller methods with documented descriptions/routes
- Error handling middleware
- Authentication middleware for protecting routes and setting user roles
- Validation using Prisma and no external libraries
- Use async/await (create fragment to clean up controller methods)
- Create a database seeder to import and destroy data
