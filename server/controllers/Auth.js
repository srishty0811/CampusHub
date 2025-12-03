const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * ======================
 *        SIGNUP
 * ======================
 */
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the necessary details",
      });
    }

    // 2️⃣ Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // 3️⃣ Generate a unique username automatically
    let baseUsername = (firstName + lastName).toLowerCase().replace(/\s+/g, "");
    let username = baseUsername;
    let counter = 1;
    while (await User.findOne({ username })) {
      username = `${baseUsername}${counter}`;
      counter++;
    }

    // 4️⃣ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create the new user
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again",
    });
  }
};

/**
 * ======================
 *        LOGIN
 * ======================
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate required fields
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    // 2️⃣ Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, please sign up",
      });
    }

    // 3️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // 4️⃣ Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({
        success: false,
        message: "Internal server error: JWT secret not configured",
      });
    }

    // 5️⃣ Create JWT token (valid for 1 year)
    const token = jwt.sign(
      { email: user.email, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "365d" } // 🔥 1-year token validity
    );

    // 6️⃣ Cookie options (also 1 year)
    const cookieOptions = {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    };

    // 7️⃣ Remove password from response
    user.password = undefined;

    // 8️⃣ Send response
    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        success: true,
        token,
        user,
        message: "User login success",
      });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failure, please try again",
    });
  }
};
