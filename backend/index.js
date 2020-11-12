const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const app = express();

const uploadRoute = require('./routes/upload.js');

app.use(fileUpload({
  createParentPath: true
}))

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use('/upload', uploadRoute);

app.listen(3030, () => {
  console.log("app running ! open http://localhost:3030/");
})
