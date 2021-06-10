const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
require('dotenv').config();
const Payment = require("../models/Payment");
const Slot = require("../models/Slot");
const User = require("../models/User");
const Booking = require("../models/Booking");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.checkout = async (req,res,next) => {
    try {
        const slot = await Slot.findById(req.body.slot);
        if (slot.booking) {
            return res.status(400).json({ msg: "Slot already booked!" });
        }
        console.log(slot);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
              {
                price_data: {
                  currency: 'cad',
                  product_data: {
                    name: 'Road-Rules Riding Class',
                  },
                  unit_amount: Number(slot.price)*100,
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: process.env.FRONT_END_URL + '/confirm-payment',
            cancel_url: process.env.FRONT_END_URL + '/cancel-payment',
          });
        let payment = Payment({
            session: session.id,
            slot: req.body.slot,
            client: req.body.client
        })
        payment.save((err, pay) => {
            if (err) {
                console.log(err);
              return res.status(400).json({ msg: err.message });
            }
            return res.status(201).json({ id: pay.session });
        })
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            msg: e.message
        });
    }
}

exports.confirmRideOnline = async (req,res,next) => {
    try {
        if (!req.query.id || !req.query.address) {
            return res.status(400).json({ msg: "You need to send session id!" });
        }
        const session = await stripe.checkout.sessions.retrieve(
            req.query.id
          );
        if (session.payment_status == 'paid') {
            const payment = await Payment.findOne({session: req.query.id});
            const slot = await Slot.findById(payment.slot);
            if (slot.booking) {
                return res.status(400).json({ msg: "Slot already booked!" });
            }
            const client = await User.findById(payment.client);
            const address = client.address.filter(a=> a._id == req.query.address)[0];
            const booking = {
                client : client._id,
                clientName : client.fullName,
                stylist : slot.stylist,
                slot : slot._id,
                status : "scheduled",
                modeOfPayment : "online",
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
                let newBooking= Booking(booking); 
                newBooking.save((err, ride) => {
                    if (err) {
                        return res.status(400).json({ msg: err.message });
                    }
                    slot.booking = ride._id;
                    slot.save((err, slot) => {
                        if (err) {
                            return res.status(400).json({ msg: err.message });
                        }
                        const msg = {
                            to: client.email,
                            from: process.env.SENDGRID_EMAIL, // Change to your verified sender
                            subject: 'Barberknocks slot Confirmed',
                            text: 'Slot Confirmed',
                            html: `<h1>Slot Details</h1>
                                   <pre> Date  : ${slot.date} </pre>
                                   <pre> Time  : ${slot.time} </pre>
                                   <pre> Mode of Payment : Online </pre>`,
                          }
                          sgMail.send(msg)
                          .then(info => {
                              return res.status(201).json(ride);
                          })
                          .catch(err => {
                              res.status(400).send({msg: "Some error"})
                          });
                    })
                });
            })
        }
    } catch (e) {
        return res.status(400).send({
            msg: e.message
        });
    }
}