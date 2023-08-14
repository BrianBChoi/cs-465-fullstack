const mongoose = require('mongoose'); //.set('debug', true);
const User = mongoose.model('users');
const Model = mongoose.model('trips');

const getUser = (req, res, callback) => {
    if (req.payload && req.payload.email) {
        User
            .findOne({ email : req.payload.email })
            .exec((err, user) => {
                if (!user) {
                    return res
                        .status(404)
                        .json({"message": "User not found"});
                } else if (err) {
                console.log(err);
                return res
                    .status(404)
                    .json(err);
                }
                callback(req, res, user.name);
            });
    } else {
      return res
        .status(404)
        .json({"message": "User not found"});
    }
};

//GET: /trips - lists all the trips
const tripsList = async (req, res) => {
    Model
        .find({}) //empty filter for all trips
        .exec((err, trips) => {
            if (!trips) {
                return res
                    .status(404)
                    .json({ "message": "trips not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trips);
            }
        });
};

//GET: /trips/:tripCode - returns a single trip
const tripsFindByCode = async (req, res) => {
    Model
        .find({ 'code': req.params.tripCode })
        .exec((err, trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .json({ "message": "trip not found" });
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(trip);
            }
        });
};

//POST: /trips - adds a single trip
const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Model
                .create({
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                },
                (err, trip) => {
                    if (err) {
                        return res
                            .status(400) // bad request, invalid content
                            .json(err);
                    } else {
                    return res
                        .status(201) // created
                        .json(trip);
                    }
                });
        }
    );
}  

//PUT: /trips/:tripCode - edits a single trip
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Model
                .findOneAndUpdate({ 'code': req.params.tripCode }, {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }, { new: true })
                .then(trip => {
                    if (!trip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    res.send(trip);
                }).catch(err => {
                    if (err.kind === 'ObjectId') {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    return res
                        .status(500) // server error
                        .json(err);
                });
            }
    );
}

//DELETE: /trips/:tripCode - deletes a single trip
const tripsDeleteTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Model
                .findOneAndDelete({ 'code': req.params.tripCode },
                (err, deletedTrip) => {
                    if (err) {
                        return res
                            .status(500)
                            .json(err);
                    }
                    if (!deletedTrip) {
                        return res
                            .status(404)
                            .send({
                                message: "Trip not found with code " + req.params.tripCode
                            });
                    }
                    return res
                        .status(200)
                        .send({
                            message: "Trip deleted successfully!"
                        });
                })
        }
    );
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
};