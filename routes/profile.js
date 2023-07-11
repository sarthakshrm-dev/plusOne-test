const express = require('express');
const profileController = require('../controllers/profileController');
const JSWAuth = require('../middlewares/JSWAuth')

const router = express.Router();

router.get('/fetch-all', JSWAuth, profileController.getData);
router.get('/get-hotels', JSWAuth, profileController.getHotels);

module.exports = router;