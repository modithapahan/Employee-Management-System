const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {registerValidate,loginValidate} = require('../validation/userValidation');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res) => {

      const {error} = registerValidate(req.body);
      if(error) return res.status(400).send(error.details[0].message);
    
      const emailExist = await User.findOne({
        email: req.body.email
      })
      if(emailExist){
        return res.status(400).send('Email already exist')
      };

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

router.post('/login', async(req,res) => {

      const {error} = loginValidate(req.data);
      if(error) return res.status(400).send(error.details[0].message);
    
      const user = await User.findOne({email: req.body.email});
      if(!user) return res.status(400).send('Invalid Email');

      const validPassword = await bcrypt.compare(req.body.password,user.password);
      if(!validPassword) return res.status(400).send('Invalid Password!');

      /* Generate a token */
      const token = jwt.sign({_id: user._id}, process.senv.TOKEN_SECRET);
      res.header('auth-token',token).send(token);
});

module.exports = router;