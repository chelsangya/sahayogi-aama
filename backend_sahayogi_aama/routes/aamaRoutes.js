const router = require('express').Router()
const aamaControllers = require('../controllers/aamaControllers')

router.post('/create', aamaControllers.createAama)
router.get('/get', aamaControllers.getAama)
router.put('/updateVerification', aamaControllers.updateAamaVerification)
router.get('/getById/:id', aamaControllers.getAamaById)
router.delete('/delete/:id', aamaControllers.deleteAamaById)
router.put('/update/:id', aamaControllers.updateAama)

module.exports = router