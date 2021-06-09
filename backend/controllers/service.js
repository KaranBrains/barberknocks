const Service = require("../models/Service");
const mime = require('mime');
const fs = require('fs');

exports.addService = async (req,res,next) => {
    var matches = req.body.icon.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
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
    let fileName = req.body.name + '.' + extension;
    try {
        fs.writeFileSync("./assets/images/barberknocks/" + fileName, imageBuffer, 'utf8');
        let newService = {
            ...req.body,
            icon : "images/" +  fileName
        }
        let service = Service(newService);
        service.save()
        .then((data,error)=>{
            if (error) {
                return res.status(400).send({
                    msg: "Failed to add"
                });
            }
            return res.status(200).send({
                msg: "Service Added succesfully",
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
        Service.find({}, (err, services) => {
            if (err) {
                return res.status(400).json({ msg: err });
            }

            if (services) {
                return res.status(200).json({ services: services });
            }
        });
    } catch (e) {
        return res.status(400).json({ msg: e });
    } 
}

exports.getServiceById = (req, res) => {
    Service.findById(req.query.id , (err, service) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }
        return res.status(201).json({service: service});
    })
};

exports.deleteService = (req, res) => {
    if ( !req.query.id ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    Service.findByIdAndDelete(req.query.id , (err,instructor) => {
        if (err) {
            return res.status(400).json({ msg: err.message });
        }
        return res.status(201).json(instructor);
    })
};
