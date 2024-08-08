const express = require('express');
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userControllers');
const authGuard = require('../middleware/authGuard');

const router = express.Router();

router.post('/create', [
  body('fullName').trim().escape().notEmpty().withMessage('Full name is required'),
  body('phoneNumber').trim().escape().notEmpty().withMessage('Phone number is required'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).trim().escape().withMessage('Password must be at least 8 characters long'),
  body('address').trim().escape().notEmpty().withMessage('Address is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, userController.createUser);

router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('password').isLength({ min: 8 }).trim().escape().withMessage('Password must be at least 8 characters long')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, userController.loginUser);

router.put('/editPassword/:id', authGuard, [
  body('currentPassword').isLength({ min: 8 }).trim().escape().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 8 }).trim().escape().withMessage('New password must be at least 8 characters long')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, userController.updateUserPassword);

router.put('/editProfile', authGuard, [
  body('fullName').trim().escape().notEmpty().withMessage('Full name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('address').trim().escape().notEmpty().withMessage('Address is required'),
  body('phoneNumber').trim().escape().notEmpty().withMessage('Phone number is required')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, userController.updateUser);

router.put('/uploadImage', authGuard, userController.uploadImage);
router.post("/send-otp", [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, userController.forgotPassword);
router.post("/reset-password", [
  body('email').isEmail().normalizeEmail().withMessage('Invalid email'),
  body('otp').trim().escape().notEmpty().withMessage('OTP is required'),
  body('newPassword').isLength({ min: 8 }).trim().escape().withMessage('New password must be at least 8 characters long')
], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
}, userController.resetPassword);

module.exports = router;