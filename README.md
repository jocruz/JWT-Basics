# 🛡️ JWT Basics

## Overview
Delving into JSON Web Tokens (JWT), a fundamental component for secure data exchanges and authentication/authorization in web applications. This guide unpacks the creation, validation, and usage of JWTs, illuminating their role in modern web security.

## 📜 What is JWT?
JWT (JSON Web Tokens) encapsulate claims between two parties, comprising:

- **Header**: Token type and algorithm specification.
- **Payload**: Claims about the user and metadata.
- **Signature**: Validates the token's origin and integrity.

## 🚀 Implementation Overview

Using a hands-on approach, we examine JWT through:

- Front-end interaction, showcasing JWT storage and access management.
- Back-end processes, focusing on token generation during user authentication:

```javascript
const id = new Date().getDate();
const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' });
res.status(200).json({ msg: 'user created', token });
```

## 🔐 Authentication and Middleware

- JWTs travel in the `Authorization` header as `Bearer <token>`.
- `authenticationMiddleware` validates the token for secure route access:

```javascript
const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route');
  }
};
```

## 📂 Project Structure

- `./routes/main.js`: Defines routes (`/dashboard`, `/login`) with `authMiddleware` for authentication.
- `./controllers/main.js`: Manages login and dashboard interactions, generating and validating JWTs.

### `./routes/main.js`
Sets up the Express router, managing:
- **GET `/dashboard`**: Authenticated route displaying the dashboard.
- **POST `/login`**: Handles user login, returning a JWT for successful authentication.

### `./controllers/main.js`
Contains two primary functions:
- **login**: Verifies credentials and returns a JWT.
- **dashboard**: Serves the authenticated user's dashboard view, reliant on successful JWT validation.

## 🎯 Key Takeaways

- JWTs are pivotal in secure communication and user management in web applications.
- The signature ensures the authenticity and untampered state of the token.
- Proper handling and validation of JWTs are crucial for application security.
