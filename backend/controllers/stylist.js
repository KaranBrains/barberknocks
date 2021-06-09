const Stylist = require("../models/Stylist");
const mime = require('mime');
const fs = require('fs');

exports.addStylist = async (req,res,next) => {
    var matches = req.body.img.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {}; 
    if (matches.length !== 3) {
        return res.status(400).send({
            msg: "Invalid Image"
        });

    }  
    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');
    let decodedImg = response;
    let imageBuffer = decodedImg.data;
    let type = decodedImg.type;
    let extension = mime.extension(type);
    let fileName = req.body.fullName + '.' + extension;
    try {
        fs.writeFileSync("./assets/images/barberknocks/" + fileName, imageBuffer, 'utf8');
        let product = {
            ...req.body,
            img : "images/" +  fileName
        }
        let stylist = Stylist(product);
        stylist.save()
        .then((data,error)=>{
            if (error) {
                return res.status(400).send({
                    msg: "Failed to add"
                });
            }
            return res.status(200).send({
                msg: "Stylist Added succesfully",
                data: data,
            }); 
        });
    } catch (e) {
        console.log(e);
        return res.status(400).send({
            msg: e
        });
    }
}
// get all
exports.getAll = async (req,res) => {
    try {
        Stylist.find({}, (err, stylists) => {
            if (err) {
                return res.status(400).json({ msg: err });
            }

            if (stylists) {
                return res.status(200).json({ stylists: stylists });
            }
        });
    } catch (e) {
        return res.status(400).json({ msg: e });
    } 
}

exports.getStylistsByService= async (req,res) => {
    try {
        Stylist.find({service:req.query.id , city:req.query.city}, (err, stylists) => {
            if (err) {
                return res.status(400).json({ msg: err });
            }

            if (stylists) {
                return res.status(200).json({ stylists: stylists });
            }
        });
    } catch (e) {
        return res.status(400).json({ msg: e });
    } 
}

exports.getStylistById = (req, res) => {
    Stylist.findById(req.query.id , (err, stylist) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }
        return res.status(201).json({Stylist: Stylist});
    })
};

exports.deleteStylist = (req, res) => {
    if ( !req.query.id ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    Stylist.findByIdAndDelete(req.query.id , (err,stylist) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }
        return res.status(201).json(stylist);
    })
};
