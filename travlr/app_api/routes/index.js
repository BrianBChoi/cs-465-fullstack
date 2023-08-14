const express = require('express');
const router = express.Router();

const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ['HS256']
});

const ctrlAuth = require('../controllers/authentication');
const ctrlTrips = require('../controllers/trips');

// Authentication routes
router
    .route('/login')
    .post(ctrlAuth.login);

router
    .route('/register')
    .post(ctrlAuth.register);

// Trip routes
router
    .route('/trips')
    .get(ctrlTrips.tripsList)
    .post(auth, ctrlTrips.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(ctrlTrips.tripsFindByCode)
    .put(auth, ctrlTrips.tripsUpdateTrip)
    .delete(auth, ctrlTrips.tripsDeleteTrip);

module.exports = router;
