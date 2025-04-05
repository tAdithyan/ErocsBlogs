import { CONFLICT, NOT_FOUND, SERVR_ERROR } from "../constants/Stauscodes.js";
import User from "../model/user.model.js";
import {generateAccessToken} from '../utils/jwtUtils.js'
import {generateRefreshToken} from '../utils/jwtUtils.js'
import RefreshToken from "../model/refreshToken.js";
import jwt from 'jsonwebtoken';




const register = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }
  
      const userFound = await User.findOne({ email: email });
      if (userFound) {
        return res.status(409).json({
          message: "User already exists",
        });
      }

      const count = await User.countDocuments({});
  
      const newUser = new User({
        email: email,
        password: password,
        is_admin: count === 0, 
      });
  
      await newUser.save();
  
      return res.status(201).json({
        message: "User successfully registered",
        user: newUser,
      });
    } catch (error) {
      // Catch any unexpected errors and return a server error response
      console.error(error); // Log the error for debugging purposes
      return res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(NOT_FOUND).json({
          message: "Email and password are required"
        });
      }
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(NOT_FOUND).json({ 
          message: "User not Found or Not Verified" 
        });
      }
  
      const isPasswordValid = await user.isValidPassword(password);
      if (!isPasswordValid) {
        return res.status(UNAUTHORIZED).json({ 
          success: false, 
          message: 'Invalid email or password' 
        });
      }
  
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
  
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });


  
      return res.status(200).json({ 
        success: true, 
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
  
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  }



  
  const refreshToken = (req, res) => {
    try {
      // Check for refreshToken in cookies first
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
      }
  
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }
  
        const accessToken = jwt.sign({ userId: decoded.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        return res.status(200).json({ accessToken });
      });
    } catch (error) {
      console.error('Error while refreshing token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  



export  { register,login,refreshToken}
