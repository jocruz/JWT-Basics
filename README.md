# JWT-Basics

# ./routes/main.js

This file sets up an Express router to handle HTTP requests for a web application. It exports a router object that defines ***two routes: /dashboard and /login.***

- The /dashboard route is a GET request that requires authentication using the authMiddleware middleware function before it can be accessed. If authentication is successful, the dashboard function from the main controller will be executed.

- The /login route is a POST request that expects a request body containing a username and password. If the login credentials are valid, the login function from the main controller will be executed.

The authMiddleware middleware function is responsible for verifying that a user is authenticated before allowing access to protected routes. If authentication fails, the middleware function will terminate the request-response cycle and prevent any further middleware functions or route handlers from being executed.