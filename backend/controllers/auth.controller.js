const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = await User.findOne({ username });
    if (user) return res.sendStatus(500).send("Username already exists!");

    const createdUser = await User.create(req.body);
    return res.status(201).json({ user: createdUser, token });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).send("Internal server error!");
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("-password ");
    if (!user) return res.sendStatus(400).send("username/password incorrect!");

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.sendStatus(400).send("username/password incorrect!");

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    return res.sendStatus(200).json({ user, token });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).send("Internal server error!");
  }
};

module.exports = {
  register,
  login,
};