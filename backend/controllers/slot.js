const Slot = require("../models/Slot");
const Instructor = require("../models/Instructor");

exports.addSlot = async (req, res) => {
    if (
        !req.body.date ||
        !req.body.time ||
        !req.body.instructor ||
        !req.body.clientLimit
    ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    const instructor = await Instructor.findById(req.body.instructor);
    const inputSlot = {
        ...req.body,
        instructorName : instructor.fullName,
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
        !req.body.instructor ||
        !req.body.clientLimit
         ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    const instructor = await Instructor.findById(req.body.instructor);
    const updateSlot = {
        ...req.body,
        instructorName : instructor.fullName
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