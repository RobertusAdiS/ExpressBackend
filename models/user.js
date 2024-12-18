const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // The name field is required
  gender: { type: String, required: true }, // The gender field is required
  email: { type: String, required: true, unique: true }, // The email field is required and must be unique
  password: { type: String, required: true }, // The password field is required
});

// Method to generate a JWT token for the user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d", // Token expires in 7 days
  });
  return token;
};

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

// Function to validate user data
const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"), // Validate name as a required string
    gender: Joi.string().required().label("Gender"), // Validate gender as a required string
    email: Joi.string().email().required().label("Email"), // Validate email as a required string and must be a valid email format
    password: passwordComplexity().required().label("Password"), // Validate password with complexity requirements
  });
  return schema.validate(data);
};

module.exports = { User, validate };
