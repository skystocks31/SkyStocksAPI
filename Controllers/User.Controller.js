const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/Users.model");

module.exports = {
  signUp: async (req, res) => {
    // Existing user Check
    // Hashed Password
    // User Creation
    // Token Generate
    const { userName, phoneNo, email, password, admin, premium } = req.body;

    try {
      const existingUser = await UserModel.find({ phoneNo: phoneNo });
      if (existingUser.length) {
        return res.status(400).json({ messsage: "User already Exists" });
      }

      const hashedPasswword = await bcrypt.hash(password, 10);
      req.body.password = hashedPasswword;

      const user = new UserModel({
        userName: userName,
        phoneNo: phoneNo,
        email: email,
        password: hashedPasswword,
        admin: admin ? admin : false,
        premium: premium ? premium : false,
      });
      const result = await user.save();

      const token = jwt.sign(
        { mobile: result.mobile, id: result._id },
        process.env.SECRET_KEY
      );
      res.status(201).json({ user: result, token: token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  signIn: async (req, res) => {
    const { phoneNo, password } = req.body;
    try {
      const existingUser = await UserModel.find({ phoneNo: phoneNo });
      if (!existingUser.length) {
        return res.status(404).json({ messsage: "User not registered" });
      }

      const matchPassword = await bcrypt.compare(
        password,
        existingUser[0].password
      );

      if (!matchPassword) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { mobile: existingUser.mobile, id: existingUser._id },
        process.env.SECRET_KEY
      );
      res.status(201).json({ user: existingUser, token: token });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
};
