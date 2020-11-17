const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const cors = require('cors');
const uploadJsonRoute = require('./routes/uploadJson.js');
const serv = require('./server');

app.use(cors());

app.use(fileUpload({
    createParentPath: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/uploadjson', uploadJsonRoute);

if (process.argv.length > 2) {
    let mode = process.argv[2];
    switch (mode) {
        case "deploy":
            deploy();
            break;
        case "test" || "dev":
            dev();
            break;
        default:
            dev();
            break;
    }
} else {
    dev();
}

function dev() {
    serv.dev(app);
}

function deploy() {
    serv.deploy(app);
}

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
