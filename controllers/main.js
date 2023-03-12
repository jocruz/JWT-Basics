// check username, password in post(login) request
// if exist create new JWT
// send back to fron-end
// setup authentication so only the request with JWT can access the dasboard

const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const {BadRequestError} = require('../errors')

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  // This id would be the id from our document from the mongodb database, where we would have a username created and its respected ID
  // however due to not being created to the database, we will just use the date().getDate() to mimic that long number string.
  const id = new Date().getDate();
  // Best practice to keep payload small for better user experience
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "Usercreated", token });
};

// const dashboard = async (req, res) => {
//   console.log(req.headers);
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer")) {
//     throw new CustomAPIError("No Token Provided", 401);
//   }
//   const token = authHeader.split(" ")[1];
//   console.log("This is the authHeader", authHeader);
//   console.log("This is the token from split", token);
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);
//     const luckyNumber = Math.floor(Math.random() * 100);
//     res.status(200).json({
//       msg: `Hello, ${decoded.username}`,
//       secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
//     });
//   } catch (error) {
//     throw new CustomAPIError("Not authorized to access this route", 401);
//   }
// };

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`, // This req.user is made in the auth.js middleware, and we pass it on through next()
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
