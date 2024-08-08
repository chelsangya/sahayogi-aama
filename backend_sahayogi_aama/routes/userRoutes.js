const router = require('express').Router();
const { body } = require('express-validator');
const userController = require('../controllers/userControllers');
const authGuard = require('../middleware/authGuard');

router.post('/create', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 5 }).trim().escape(),
  body('fullName').trim().escape(),
  body('phoneNumber').trim().escape(),
  body('address').trim().escape()
], userController.createUser);

router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 5 }).trim().escape()
], userController.loginUser);

router.put('/editPassword/:id', authGuard, [
  body('currentPassword').isLength({ min: 5 }).trim().escape(),
  body('newPassword').isLength({ min: 5 }).trim().escape()
], userController.updateUserPassword);

router.put('/editProfile', authGuard, [
  body('fullName').trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('address').trim().escape(),
  body('phoneNumber').trim().escape()
], userController.updateUser);

router.put('/uploadImage', authGuard, userController.uploadImage);

router.post("/send-otp", [
  body('email').isEmail().normalizeEmail()
], userController.forgotPassword);

router.post("/reset-password", [
  body('email').isEmail().normalizeEmail(),
  body('otp').isLength({ min: 4, max: 4 }).trim().escape(),
  body('newPassword').isLength({ min: 5 }).trim().escape()
], userController.resetPassword);

module.exports = router;
