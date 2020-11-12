const express = require('express');
const router = express.Router();
const { exec } = require('child_process');

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
        exec(`gcc -o ./tmp/exec/${req.files.avatar.name} ./tmp/${req.files.avatar.name} ; ./tmp/exec/${req.files.avatar.name}`, (err, stdout, stderr) => {
          if (err) {
            console.log(`err: ${err}`);
            res.send({
              status: ''
            })
            return;
          }
          if (stderr) {
            console.log(`stderr: ${stderr}`);
            return
          }
          console.log(`compile output: ${stdout}`);
          res.send({
            status: "ok",
            output: stdout
          });
        })
      });
    }
  } catch (ex) {
    console.log(ex);
  }
});

module.exports = router;
