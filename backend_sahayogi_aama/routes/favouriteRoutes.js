const router = require('express').Router()
const authGuard = require('../middleware/authGuard')
const favouriteControllers = require('../controllers/favouriteControllers')

router.post('/create', authGuard, favouriteControllers.createFavourite)
router.get('/all', authGuard, favouriteControllers.getFavList)
router.delete('/delete/:id', authGuard, favouriteControllers.removeFav)

module.exports = router;