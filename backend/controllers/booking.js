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
            !req.body.address
        ) {
            return res.status(400).json({ msg: 'Invalid data' });
        }
        const slot = await Slot.findById(req.body.slot);
        const client = await User.findById(req.body.client);
        const address = client.address.filter(a=> a._id==req.body.address)[0];
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
                          return res.status(201).json({booking:ride});
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

// exports.endRide = async (req, res) => {
//     try {
//         if (
//             !req.query.ride
//         ) {
//             return res.status(400).json({ msg: 'Invalid data' });
//         }
//         Booking.findById(req.query.ride, (err,ride)=>{
//             if (err) {
//                 return res.status(400).json({ msg: err.message });
//             }
//             ride.status = "completed";
//             ride.save((err,ride)=>{
//                 if (err) {
//                     return res.status(400).json({ msg: err.message });
//                 }
//                 return res.status(201).json({ msg : "Ride Ended" });
//             })
//         })
//     } catch (err) {
//         return res.status(400).json({ msg: err.message });
//     }
// };

// exports.allRides = async (req, res) => {
//     try {
//         Ride.find({}, (err,rides)=>{
//             if (err) {
//                 return res.status(400).json({ msg: err.message });
//             }
//             return res.status(201).json({ allRides : rides });
//         })
//     } catch (err) {
//         return res.status(400).json({ msg: err.message });
//     }
// };

// exports.getRideById = async (req, res) => {
//     try {
//         if (
//             !req.query.id
//         ) {
//             return res.status(400).json({ msg: 'Invalid data' });
//         }
//         Ride.findById(req.query.id, (err,ride)=>{
//             if (err) {
//                 return res.status(400).json({ msg: err.message });
//             }
//             return res.status(201).json({ ride : ride });
//         })
//     } catch (err) {
//         return res.status(400).json({ msg: err.message });
//     }
// };

// exports.feedback = async (req, res) => {
//     try {
//         if (
//             !req.query.ride ||
//             !req.body.rating
//         ) {
//             return res.status(400).json({ msg: 'Invalid data' });
//         }
//         const ride = await Ride.findById(req.query.ride);
//         const instructor = await Instructor.findById(ride.instructor);
//         const feedback = {
//             stars : req.body.rating,
//             feedback : req.body.feedback? req.body.feedback : 'No Feedback Given.',
//             ride : ride._id,
//             clientName : ride.clientName
//         }
//         ride.rating = req.body.rating;
//         ride.feedback = req.body.feedback? req.body.feedback : 'No Feedback Given.';
//         await ride.save((err) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(400).json({ msg: err.message });
//             }
//         })
//         instructor.rating.push(feedback);
//         await instructor.save((err,instructor) => {
//             if (err) {
//                 console.log(err);
//                 return res.status(400).json({ msg: err.message });
//             }
//             return res.status(200).json({ feedback: instructor });
//         })
//     } catch (err) {
//         console.log(err);
//         return res.status(400).json({ msg: err.message });
//     }
// };