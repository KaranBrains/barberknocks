const express     = require("express");
const mongoose    = require('mongoose');
const config      = require('./config/config');
const cors        = require('cors');
const route       = require('./routes/router.js');
const createAdmin = require('./migrations/migrate');
const path        = require('path');
const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('../../../../../etc/letsencrypt/live/pigameapp.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('../../../../../etc/letsencrypt/live/pigameapp.com/cert.pem', 'utf8');
const ca = fs.readFileSync('../../../../../etc/letsencrypt/live/pigameapp.com/chain.pem', 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const app = express();
const httpsServer = https.createServer(credentials, app);

mongoose.connect(config.db, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true })
.then(()=>{
    console.log("Mongo DB connected")
})

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/', route.init());
app.use('/images', express.static(path.join('assets/images/barberknocks')));

// app.listen(8082,()=>{

//     console.log("Server is running on port : 8080");
//     // run this to create a admin only once on the first run
//     // createAdmin.createAdmin();
// })

httpsServer.listen(8081, () => {
    console.log("Server is running on port : 8081");
});