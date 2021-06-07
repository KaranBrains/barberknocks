const User = require("../models/User");

exports.createAdmin= ()=> {
    const incomingUser = {
        email : "admin@roadrules.com",
        fullName : "Admin",
        phone : "123456789" ,
        password : "Admin123@",
        isNumberVerified : true,
        isEmailVerified : true,
        role: 'admin',
    }
    
    let newUser = User(incomingUser);
    newUser.save((err, user) => {
    if (err) {
        console.log(err);
    }
    console.log(user);
    });
} 
