const express = require('express');
const router = express.Router();
const compile = require('../compile');

router.post('/', async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: 422,
        message: 'no file upload !'
      });
    } else {
      console.log(req.files);
      req.files.avatar.mv("./tmp/" + req.files.avatar.name, () => {
        compile(req, res, req.files.avatar.name);
      });
    }
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
