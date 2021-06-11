const Slot = require("../models/Slot");
const Stylist = require("../models/Stylist");
const Service = require("../models/Service");

exports.addSlot = async (req, res) => {
    if (
        !req.body.date ||
        !req.body.time ||
        !req.body.stylist ||
        !req.body.price
    ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    const stylist = await Stylist.findById(req.body.stylist);
    const service = await Service.findById(stylist.service);
    const inputSlot = {
        ...req.body,
        stylistName : stylist.fullName,
        city: stylist.city,
        service: service.name,
        status : 'scheduled'
    }
    let newSlot = Slot(inputSlot);
    newSlot.save((err, slot) => {
        return res.status(201).json(slot);
    });
};

exports.deleteSlot = (req, res) => {
    if ( !req.query.id ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    Slot.findByIdAndDelete(req.query.id , (err,slot) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(201).json(slot);
    })
};

exports.modifySlot = async (req, res) => {
    if ( 
        !req.query.id ||
        !req.body.date ||
        !req.body.time ||
        !req.body.stylist ||
        !req.body.price
         ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    const stylist = await Stylist.findById(req.body.stylist);
    const service = await Service.findById(stylist.service);
    const oldSlot = await Slot.findById(req.query.id);
    const updateSlot = {
        ...req.body,
        stylistName : stylist.fullName,
        city: stylist.city,
        service: service.name,
        status : oldSlot.status
    }
    Slot.findByIdAndUpdate(req.query.id, updateSlot , (err,slot) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(201).json({ msg: 'Updated slot successfully' });
    })
};

exports.getSlots = (req, res) => {
    Slot.find({} , (err,slots) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(201).json({slots: slots});
    })
};

exports.searchSlotByDate = (req, res) => {
    if ( !req.query.date ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    Slot.find({ date:req.query.date } , (err,slots) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(201).json({slots: slots});
    })
};

exports.getSlotById = (req, res) => {
    Slot.findById(req.query.id , (err,slot) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(201).json({slot: slot});
    })
};

exports.getSlotByLocation = async (req, res) => {
    const service = await Service.findById(req.query.service);
    Slot.find({city:req.query.city , service:service.name} , (err,slots) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(201).json({slots: slots});
    })
};