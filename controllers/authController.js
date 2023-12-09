const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePasssword } = require("../helpers/auth");
const dotenv = require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all feilds",
      });
    } else {
      const { email, password } = req.body;
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        return res.status(400).json({
          error: "No user found",
        });
      }

      const match = await comparePasssword(password, user.password);

      if (match) {
        // Sign a JWT and set cookie
        const token = jwt.sign(
          { id: user._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          },
          (err, token) => {
            if (err) throw err;
            res.cookie("Auth-Token", token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
              secure: false,
              sameSite: "strict",
            });
          }
        );

        return res.status(200).json({
          message: "User Logged in successfully",
          user,
          token,
        });
      } else {
        res.json({
          error: "Please enter valid credentials",
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

const register = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    if (!username || !name || !email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(401).json({
        message: "User already exists",
      });
    } else {
      const hashedPass = await hashPassword(password);
      const user = new User({
        username,
        name,
        email,
        password: hashedPass,
      });
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) throw err;
          res.cookie("Auth-Token", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
            secure: false,
            sameSite: "strict",
          });
        }
      );
      user.token = token;
      await user.save();

      return res.status(200).json({
        message: "User created successfully",
        user,
        token,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login,
  register,
};
