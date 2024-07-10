const router=require('express').Router();
const userController=require('../controllers/userControllers');
const authGuard = require('../middleware/authGuard')

router.post('/create', userController.createUser)
router.post('/login', userController.loginUser) 
router.put('/editPassword/:id', authGuard, userController.updateUserPassword)
router.put('/editProfile', authGuard, userController.updateUser)

module.exports= router;