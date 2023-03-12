# JWT-Basics

# ./routes/main.js

This file sets up an Express router to handle HTTP requests for a web application. It exports a router object that defines ***two routes: /dashboard and /login.***

- The /dashboard route is a GET request that requires authentication using the authMiddleware middleware function before it can be accessed. If authentication is successful, the ***dashboard function*** from the main controller will be executed.

- The /login route is a POST request that expects a request body containing a username and password. If the login credentials are valid, the ***login function from the main controller will be executed.***

The authMiddleware middleware function is responsible for verifying that a user is authenticated before allowing access to protected routes. If authentication fails, the middleware function will terminate the request-response cycle and prevent any further middleware functions or route handlers from being executed.

# ./controllers/main.js

This file exports two functions that are used as controller functions in an Express web application.

-The login function 
    handles a POST request that expects a request body containing a username and password. If the request body does not contain both a username and password, a BadRequestError will be thrown. If the credentials are valid, a JSON Web Token (JWT) is generated using the jsonwebtoken library, and is signed using a secret key specified in the application's environment variables. The JWT is then sent back to the client in the response body.

-The dashboard function 
    handles a GET request that requires authentication using a JWT. If the JWT is valid, the function generates a random number and sends a JSON response containing a greeting message and the authorized data.

The controller functions are designed to work with middleware that performs validation, such as mongoose or Joi, but in this example, the validation is done in the controller functions themselves.


# ./middleware/auth.js

This file exports a middleware function that can be used in an Express web application to authenticate incoming requests using a JSON Web Token (JWT).

The middleware function first checks that the Authorization header is present and starts with the string "Bearer ". If it is not, an UnauthenticatedError is thrown. If the header is present and has the correct format, the JWT is extracted from the header and verified using the jsonwebtoken library, and a decoded payload is obtained. If the verification succeeds, the decoded payload is attached to the req object as req.user, and the middleware calls the next() function to pass control to the next middleware function or route handler. If the verification fails, an UnauthenticatedError is thrown.

This middleware function can be used to protect routes that require authentication. When a client sends a request to an authenticated route, it must include a JWT in the Authorization header, in the format "Bearer <token>". If the JWT is valid, the request will be allowed to proceed to the protected route, and the decoded payload will be available in req.user. If the JWT is not valid, an error response will be sent back to the client.