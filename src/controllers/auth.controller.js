import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  // Get data => name, email, password, confirmPassword => req.body
  // Validate data
  // Check if user already exists
  // Hash password using bcryptjs
  // password and confirmPassword should match
  // Save user to database
  // Generate token
  // Send response
  try {
    const { name, email, role, password, confirmPassword } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      role,
      password,
      confirmPassword,
    });
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate data
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user.email, user.role);

    // Send response
    res.status(200).json({ message: "User login Successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login };
