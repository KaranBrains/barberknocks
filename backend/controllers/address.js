const User = require("../models/User");

exports.addAddress = (req, res) => {
  if (
    !req.body.city ||
    !req.body.province ||
    !req.body.street ||
    !req.body.postalCode ||
    !req.query.email
  ) {
    return res.status(400).json({ msg: 'Please send all entries' });
  }
  User.findOne({ email: req.query.email }, (err, user) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }
    user.address.push(req.body);
    user.save((err, savedUser)=>{
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(200).json({ msg: 'Address added successfully!' });
    })
  });
};



