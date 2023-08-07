const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');

/* GET TRIPS */
router
    .route('/trips')
    .get(ctrlTrips.tripsList)
    .post(ctrlTrips.tripsAddTrip);

router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);

module.exports = router;
