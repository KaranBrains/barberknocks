const User = require("../models/User");
const Ride = require("../models/Rides");

exports.getUsers = (req, res) => {
    try {
        User.find({ role: 'user' }, (err, users) => {
            if (err) {
                return res.status(400).json({ msg: err });
            }

            if (users) {
                return res.status(200).json({ users: users });
            }
        });
    } catch (e) {
        return res.status(400).json({ msg: e });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const rides = await Ride.find({client:req.query.id});
        User.findById(req.query.id, (err, users) => {
            if (err) {
                return res.status(400).json({ msg: err });
            }

            if (users) {
                return res.status(200).json({ user: users  , rides : rides});
            }
        });
    } catch (e) {
        return res.status(400).json({ msg: e });
    }
};