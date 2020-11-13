const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const compile = require('../compile');
const fs = require('fs');

router.post('/', async (req, res) => {
   try {
       if (req.body == null || req.body.content == null) {
           res.send({message: 'need json body !'});
           return;
       } else {
           let name = uuidv4().substring(0, 5) + ".c";
           console.log(req.body.content);
           fs.writeFile("./tmp/" + name, req.body.content, (err) => {
               if (err != null) {
                   console.log(err);
                   res.send({error: err});
                   return;
               }
               compile(req, res, name);
           });
       }
   } catch (e) {
       console.log(e);
       res.send({message: 'Internal Server error', error: e})
   }
});

module.exports = router;
