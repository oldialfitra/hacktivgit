const router = require('express').Router(),
controllerUser = require('../controllers/user')

router.post('/', controllerUser.signIn)

module.exports = router