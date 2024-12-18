const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const auth = require("../middleware/authMiddleware");

// Route to register a new user
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    // Check if the user already exists in the database
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already exists!" });

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user with the hashed password
    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token for the new user
    const token = newUser.generateAuthToken();

    // Send the token to the client
    res.status(201).send({ token });
  } catch (error) {
    // Handle any server errors
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Route to get current user details
router.get("/me", auth, async (req, res) => {
  try {
    // Find the user by ID and exclude the password field
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).send({ message: "User not found" });
    res.status(200).send(user);
  } catch (error) {
    // Handle any server errors
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
