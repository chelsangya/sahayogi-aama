const router = require('express').Router()
const contactController = require('../controllers/contactControllers')

router.post('/create', contactController.createContact)
router.get('/all', contactController.getAllContacts)

module.exports = router