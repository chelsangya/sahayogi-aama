const router = require('express').Router()
const bookingControllers = require('../controllers/bookingControllers')
const authGuard = require('../middleware/authGuard')


router.post('/create' ,authGuard ,bookingControllers.createBooking)
router.get('/all', authGuard, bookingControllers.getAllBookings)
router.delete('/delete/:id', authGuard, bookingControllers.deleteBookingById)

module.exports = router