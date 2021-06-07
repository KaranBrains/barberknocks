const Instructor = require("../models/Instructor");
const mime = require('mime');
const fs = require('fs');

exports.addInstructor = async (req,res,next) => {
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
        fs.writeFileSync("./assets/images/" + fileName, imageBuffer, 'utf8');
        let product = {
            ...req.body,
            img : "images/" +  fileName
        }
        let instructor = Instructor(product);
        instructor.save()
        .then((data,error)=>{
            if (error) {
                return res.status(400).send({
                    msg: "Failed to add"
                });
            }
            return res.status(200).send({
                msg: "Instructor Added succesfully",
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
        Instructor.find({}, (err, instructors) => {
            if (err) {
                return res.status(400).json({ msg: err });
            }

            if (instructors) {
                return res.status(200).json({ instructors: instructors });
            }
        });
    } catch (e) {
        return res.status(400).json({ msg: e });
    } 
}

exports.getInstructorById = (req, res) => {
    Instructor.findById(req.query.id , (err, instructor) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }
        return res.status(201).json({instructor: instructor});
    })
};

exports.deleteInstructor = (req, res) => {
    if ( !req.query.id ) {
        return res.status(400).json({ msg: 'Invalid data' });
    }
    Instructor.findByIdAndDelete(req.query.id , (err,instructor) => {
        if (err) {
            return res.status(400).json({ msg: err });
        }
        return res.status(201).json(instructor);
    })
};
