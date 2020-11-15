const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const fs = require('fs');
const app = express();
const cors = require('cors');
const https = require('https');

const uploadRoute = require('./routes/upload.js');
const uploadJsonRoute = require('./routes/uploadJson.js');

let privateKey = fs.readFileSync('/lab/onlinegcc/backend/privkey.pem');
let certificate = fs.readFileSync('/lab/onlinegcc/backend/fullchain.pem');

app.use(cors());

app.use(fileUpload({
  createParentPath: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(morgan('dev'));

//app.use((req, res, next) => {
//  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//  next();
//});

app.use('/upload', uploadRoute);
app.use('/uploadjson', uploadJsonRoute);

const option = {
    key: privateKey,
    cert: certificate
};

https.createServer(option, app).listen(3030);

/*app.listen(3030, () => {
  console.log("app running ! open http://localhost:3030/");
})
 */

const del = (path) => {
  console.log(`Staring cleanup ${path} !`);
  fs.readdir(path, (err, files) => {
    files.forEach((f) => {
      if (f !== "exec") {
         try {
          fs.unlinkSync(path + f);
          console.log("deleted " + files);
        } catch (e) {
          console.log(e);
        }
      }
    });
  });
}

setInterval(() => {
  del('./tmp/');
  del('./tmp/exec/');
}, 1000 * 3600);
