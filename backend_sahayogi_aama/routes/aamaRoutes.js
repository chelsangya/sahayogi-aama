const router = require('express').Router();
const { body } = require('express-validator');
const aamaControllers = require('../controllers/aamaControllers');

router.post('/create', [
  body('name').trim().escape(),
  body('age').isNumeric().withMessage('Age must be a number'),
  body('time').trim().escape(),
  body('charge').isNumeric().withMessage('Charge must be a number'),
  body('experience').trim().escape(),
  body('speciality').trim().escape(),
  body('language').trim().escape(),
  body('description').trim().escape(),
  body('isVerified').isBoolean().withMessage('isVerified must be a boolean')
], aamaControllers.createAama);

router.get('/get', aamaControllers.getAama);

router.put('/updateVerification', [
  body('id').trim().escape(),
  body('isVerified').isBoolean().withMessage('isVerified must be a boolean')
], aamaControllers.updateAamaVerification);

router.get('/getById/:id', aamaControllers.getAamaById);

router.delete('/delete/:id', aamaControllers.deleteAamaById);

router.put('/update/:id', [
  body('name').trim().escape(),
  body('age').isNumeric().withMessage('Age must be a number'),
  body('time').trim().escape(),
  body('charge').isNumeric().withMessage('Charge must be a number'),
  body('experience').trim().escape(),
  body('speciality').trim().escape(),
  body('language').trim().escape(),
  body('description').trim().escape(),
  body('isVerified').isBoolean().withMessage('isVerified must be a boolean')
], aamaControllers.updateAama);

module.exports = router;