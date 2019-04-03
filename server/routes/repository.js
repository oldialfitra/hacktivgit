const router = require('express').Router(),
controllerRepository = require('../controllers/repository')

router.get('/', controllerRepository.repoSelf)

router.get('/starred', controllerRepository.repoStarred)

router.post('/', controllerRepository.repoCreate)

router.get('/search', controllerRepository.repoSearch)

router.delete('/unstar/:owner/:name', controllerRepository.unstar)

module.exports = router