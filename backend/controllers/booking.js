const Slot = require("../models/Slot");
const User = require("../models/User");
require('dotenv').config();
const Booking = require("../models/Booking");
const Stylist = require("../models/Stylist");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.addBookingCash= async (req, res) => {
    try {
        if (
            !req.body.slot ||
            !req.body.client ||
            !req.query.address
        ) {
            return res.status(400).json({ msg: 'Invalid data' });
        }
        const slot = await Slot.findById(req.body.slot);
        const client = await User.findById(req.body.client);
        const address = client.address.filter(a=> a._id==req.query.address)[0];
        if (slot.booking) {
            return res.status(400).json({ msg: "Slot already booked!" });
        }
        const booking = {
            client : client._id,
            clientName : client.fullName,
            stylist : slot.stylist,
            slot : slot._id,
            status : "scheduled",
            modeOfPayment : "cash",
            price : slot.price,
            time : slot.time,
            date : slot.date,
            stylistName: slot.stylistName,
            service: slot.service,
            address : address.street + ',' + address.province + ',' + address.city + ',' +  address.postalCode
        }
        slot.status = "booked";
        slot.save((err,s)=>{
            if (err) {
                return res.status(400).json({ msg: err.message });
            }
            let newBooking = Booking(booking); 
            newBooking.save((err, ride) => {
                if (err) {
                    return res.status(400).json({ msg: err.message });
                }
                slot.booking = ride._id;
                slot.save((err, slot) => {
                    if (err) {
                        return res.status(400).json({ msg: err.message });
                    }
                    if (err) {
                        return res.status(400).json({ msg: err.message });
                    }
                    const msg = {
                        to: client.email,
                        from: process.env.SENDGRID_EMAIL, // Change to your verified sender
                        subject: 'Barberknocks Slot Confirmed',
                        text: 'Slot Confirmed',
                        html: `<h1>Slot Details</h1>
                               <pre> Date  : ${slot.date} </pre>
                               <pre> Time  : ${slot.time} </pre>
                               <pre> Mode of Payment : Cash </pre>`,
                      }
                      sgMail.send(msg)
                      .then(info => {
                          console.log(info)
                          return res.status(201).json(ride);
                      })
                      .catch(err => {
                          res.status(400).send({msg: "Some error"})
                      });
                })
            });
        })
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
};

exports.myBookings = async (req, res) => {
    try {
        if (
            !req.query.id
        ) {
            return res.status(400).json({ msg: 'Invalid data' });
        }
        Booking.find({client: req.query.id}, (err,rides)=>{
            if (err) {
                return res.status(400).json({ msg: err.message });
            }
            return res.status(201).json({ myBookings: rides });
        })
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
};

exports.endBooking = async (req, res) => {
    try {
        if (
            !req.query.booking
        ) {
            return res.status(400).json({ msg: 'Invalid data' });
        }
        Booking.findById(req.query.booking, (err,booking)=>{
            if (err) {
                return res.status(400).json({ msg: err.message });
            }
            booking.status = "completed";
            booking.save((err,booking)=>{
                if (err) {
                    return res.status(400).json({ msg: err.message });
                }
                return res.status(201).json({ msg : "Ride Ended" });
            })
        })
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
};

exports.allBookings = async (req, res) => {
    try {
        Booking.find({}, (err,bookings)=>{
            if (err) {
                return res.status(400).json({ msg: err.message });
            }
            return res.status(201).json({ allBookings : bookings });
        })
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        if (
            !req.query.id
        ) {
            return res.status(400).json({ msg: 'Invalid data' });
        }
        Booking.findById(req.query.id, ( err, booking )=>{
            if (err) {
                return res.status(400).json({ msg: err.message });
            }
            return res.status(201).json({ booking : booking });
        })
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
};

exports.feedback = async (req, res) => {
    try {
        if (
            !req.query.booking ||
            !req.body.rating
        ) {
            return res.status(400).json({ msg: 'Invalid data' });
        }
        const booking = await Booking.findById(req.query.booking);
        const stylist = await Stylist.findById(booking.stylist);
        const feedback = {
            stars : req.body.rating,
            feedback : req.body.feedback? req.body.feedback : 'No Feedback Given.',
            booking : booking._id,
            clientName : booking.clientName
        }
        booking.rating = req.body.rating;
        booking.feedback = req.body.feedback? req.body.feedback : 'No Feedback Given.';
        await booking.save((err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ msg: err.message });
            }
        })
        stylist.rating.push(feedback);
        await stylist.save((err,stylist) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ msg: err.message });
            }
            return res.status(200).json({ feedback: stylist });
        })
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: err.message });
    }
};