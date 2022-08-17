const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async(req,res) => {

      
      const emailExist = User.findOne({email : req.body.email});
      if(emailExist) return res.status(400).send('Email already exist');

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashPassword
      })

      try {
        const saveUser = await user.save();
        res.status(200).send({user: saveUser._id});
      } catch (error) {
        res.status(200).send(error);
      }
});

module.exports = router;