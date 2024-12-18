const jwt = require("jsonwebtoken");

// Middleware function to authenticate the user
const auth = (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });

  try {
    // Verify the token using the JWT private key
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    // Attach the decoded user information to the request object
    req.user = decoded;
    // Call the next middleware function
    next();
  } catch (ex) {
    // Handle invalid token error
    res.status(400).send({ message: "Invalid token." });
  }
};

module.exports = auth;
