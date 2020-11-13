const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const fs = require('fs');
const app = express();

const uploadRoute = require('./routes/upload.js');
const uploadJsonRoute = require('./routes/uploadJson.js');

app.use(fileUpload({
  createParentPath: true
}))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/upload', uploadRoute);
app.use('/uploadjson', uploadJsonRoute);

app.listen(3030, () => {
  console.log("app running ! open http://localhost:3030/");
})

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
