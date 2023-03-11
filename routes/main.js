const express = require('express');
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authMiddleware = require('../middleware/auth')

//calling next() in authMiddleware will cause the dashboard function to be executed next.
//If authMiddleware does not call next(), then the request-response cycle will be terminated and no further middleware functions or route handlers will be executed.
router.route("/dashboard").get(authMiddleware,dashboard);
router.route("/login").post(login);

module.exports = router;
