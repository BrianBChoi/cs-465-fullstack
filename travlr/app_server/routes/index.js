const express = require('express');
const router = express.Router();
const ctrlMain = require('../controllers/main');

/* GET HOMEPAGE */
router.get('/', ctrlMain.index);
router.get('/rooms', ctrlMain.room);

module.exports = router;
