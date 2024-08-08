const router = require('express').Router();
const { body } = require('express-validator');
const contactController = require('../controllers/contactControllers');

router.post('/create', [
    body('name').trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('number').trim().escape(),
    body('message').trim().escape()
], contactController.createContact);

router.get('/all', contactController.getAllContacts);

module.exports = router;
