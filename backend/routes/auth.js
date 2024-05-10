import express from "express";
import User from "../models/User.js";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetchUser from "../middleware/fetchUser.js";
import 'dotenv/config';

const jwt_SECRET = process.env.jwt_SECRET;

const router = express.Router();

// ROUTE1    Create a user using: POST "/api/auth/". Doesnot require Auth
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("name", "Enter a valid name ").isLength({ min: 3 }),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors return bad request and errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with same email exists already
    try {
      let isExist = await User.findOne({ email: req.body.email });
      if (isExist) {
        success=true;
        return res
          .status(400)
          .json({success, error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const securedPass = await bcrypt.hash(req.body.password, salt);
      //   Creating a new user and it is promise
      const user = await new User({
        name: req.body.name,
        email: req.body.email,
        password: securedPass,
      });
      user.save();
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = await jwt.sign(data, jwt_SECRET);
      success = true;
      res.json({ success, authToken});
    } catch (err) {
      res.status(500).json({ error: "Some error occured" });
    }
  }
);

//ROUTE2    new endpoint for authenticating user => login
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      // If user does not exist then send bad request as response
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter a valid credentials" });
      }

      // Now we will compare password given by user and password store in database for that particular email
      //  bcrypt will compare passwords using hash which is internally stored by bcrypt
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please enter a valid credentials" });
      }
      // if the user is successfully authenticated then we will send id of that user as response
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = await jwt.sign(data, jwt_SECRET);
      success = true;
      res.json({success, authToken});
    } catch (err) {
      res.status(500).json({ error: "Some internal error occured" });
    }
  }
);

// ROUTE3 getting user details of logged in user
// here we have to send authToken so that we get to know if user is logged in or not
router.post(
  "/getuser",
  fetchUser,
  async (req, res) => {
    try {
      const userId = req.user.id;
      // in select we specify the field that we want to fetch and adding "-" before field name means it will not fetch that field and fetch others
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      res.status(500).json({ error: "Some internal error occured" });
    }
  }
);

export default router;
