const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = new User({ email, name, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res
      .status(201)
      .json({ token, user: { email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ message: "Registration failed", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (error) {
    res.status(400).json({ message: "Login failed", error });
  }
};

const googleLogin = async (req, res) => {
  const { email, name, googleId } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, name, googleId });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: "Google login failed", error });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Fetching user failed", error });
  }
};

module.exports = { register, login, googleLogin, getUser };
