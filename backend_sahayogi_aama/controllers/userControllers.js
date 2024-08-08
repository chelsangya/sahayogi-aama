const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sahayogiaama@gmail.com",
    pass: "icpa pzbt rdrm ldbr",
  },
});

const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, phoneNumber, email, password, address } = req.body;

  if (!fullName || !phoneNumber || !email || !password || !address) {
    return res.json({
      success: false,
      message: 'All fields are required',
    });
  }

  try {
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: 'Email is already in use'
      });
    }

    const generatedSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, generatedSalt);

    const newUser = new Users({
      fullName,
      phoneNumber,
      email,
      address,
      password: encryptedPassword
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: 'User created successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

const loginUser = async (req, res) => {
  const MAX_ATTEMPTS = 5;
  const LOCK_TIME = 3 * 60 * 1000; // 3 minutes in milliseconds
  const ATTEMPT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const foundUser = await Users.findOne({ email: email });
    if (!foundUser) {
      return res.json({
        success: false,
        message: 'User does not exist',
      });
    }

    const now = Date.now();

    if (foundUser.lockUntil && foundUser.lockUntil > now) {
      const lockTimeRemaining = Math.ceil((foundUser.lockUntil - now) / 1000); // in seconds
      return res.json({
        success: false,
        message: `Account locked. Try again later.`,
        lockTimeRemaining,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordCorrect) {
      if (foundUser.lastFailedAttempt && (now - foundUser.lastFailedAttempt.getTime()) > ATTEMPT_WINDOW) {
        foundUser.loginAttempts = 1;
      } else {
        foundUser.loginAttempts += 1;
      }

      foundUser.lastFailedAttempt = now;

      if (foundUser.loginAttempts >= MAX_ATTEMPTS) {
        foundUser.lockUntil = now + LOCK_TIME;
        const lockTimeRemaining = Math.ceil(LOCK_TIME / 1000); 
        foundUser.loginAttempts = 0; 
        await foundUser.save();
        return res.json({
          success: false,
          message: `Account locked. Try again later.`,
          lockTimeRemaining,
        });
      }

      await foundUser.save();

      const attemptsLeft = MAX_ATTEMPTS - foundUser.loginAttempts;
      return res.json({
        success: false,
        message: 'The credentials do not match',
        attemptsLeft,
      });
    }

    foundUser.loginAttempts = 0;
    foundUser.lockUntil = undefined;
    foundUser.lastFailedAttempt = undefined;

    const token = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_TOKEN_SECRET,
    );

    await foundUser.save();

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token: token,
      userData: foundUser,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
}

const updateUserPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.json({
        success: false,
        message: 'Please enter both old and new passwords',
      });
    }

    const id = req.user.id;

    const user = await Users.findById(id);

    if (!user) {
      return res.json({
        success: false,
        message: 'User not found',
      });
    }

    const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordMatch) {
      return res.json({
        success: false,
        message: 'Invalid current password',
      });
    }

    const generateSalt = await bcrypt.genSalt(10);
    const encryptedNewPassword = await bcrypt.hash(newPassword, generateSalt);

    await Users.findByIdAndUpdate(id, { password: encryptedNewPassword });

    res.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { fullName, email, address, phoneNumber } = req.body;

    const id = req.user.id;

    if (!fullName || !email || !address || !phoneNumber) {
      return res.json({
        success: false,
        message: 'Please fill all fields'
      });
    }

    const updatedUser = {
      fullName,
      email,
      address,
      phoneNumber,
    };

    await Users.findByIdAndUpdate(id, updatedUser);

    res.json({
      success: true,
      message: "User Details Updated Successfully",
      user: updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

const uploadImage = async (req, res) => {
  const userImage = req.files;
  const id = req.user.id;

  if (!userImage) {
    return res.status(403).json({
      success: false,
      message: "Please provide an image!",
    });
  }

  try {
    let uploadedImage;

    if (req.files && req.files.userImage) {
      uploadedImage = await cloudinary.v2.uploader.upload(req.files.userImage.path, {
        folder: "users",
        crop: "scale",
      });
    }

    await Users.findByIdAndUpdate(id, { userImageUrl: uploadedImage ? uploadedImage.secure_url : null });

    res.status(200).json({
      success: true,
      message: "User image updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(403).json({ success: false, message: "User not found" });
    }

    const otp = generateOTP();

    user.otp = otp;

    await user.save();

    const mailOptions = {
      from: "sahayogiaama@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Your OTP is ${otp}`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ success: false, message: "Failed to send OTP" });
      }
      res.status(200).json({ success: true, message: "OTP sent successfully" });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const resetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, otp, newPassword } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(403).json({ success: false, message: "User not found" });
    }

    if (!user.otp) {
      return res.status(403).json({
        success: false,
        message: "Please enter OTP...",
      });
    }

    if (user.otp !== otp) {
      return res.status(403).json({ success: false, message: "Invalid OTP" });
    }

    const generateSalt = await bcrypt.genSalt(10);
    const encryptedNewPassword = await bcrypt.hash(newPassword, generateSalt);

    user.password = encryptedNewPassword;
    user.otp = undefined;

    await user.save();
    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUserPassword,
  updateUser,
  uploadImage,
  resetPassword,
  forgotPassword
};
