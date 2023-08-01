const express = require('express')
const router = express.Router()
const apiController = require('../controllers/apicontrollers')

router.get('/', apiController.getIndex);


router.get('/shorturl/:urlid', apiController.getUrl);

router.post('/shorturl', apiController.postUrl);

module.exports = router;