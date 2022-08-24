const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const{registerValidation, loginValidation, updateValidation} = require('../validations/userValidation');
const verify = require('../validations/tokenVerify')
const jwt  = require('jsonwebtoken');

router.post('/register', async(req,res) => {

    /* Validate the user details */
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    /* Check the email already exist or not */
    const existEmail = await User.findOne({email: req.body.email});
    if(existEmail) return res.status(400).send('Email Already Exists');

    /* Encrypt the password */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save();
        res.status(200).send({user: savedUser._id});
    } catch (error) {
        res.status(400).send({status: "Failed"});
    }

});

router.post('/login', async(req,res)=>{
    const {error} = loginValidation(req.data);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email');

    const passwordValidation = await bcrypt.compare(req.body.password, user.password);
    if(!passwordValidation) return res.status(400).send('Invalid Password');

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);
});

router.put('/update/:id',verify,async(req,res)=>{
    const userID = req.params.id;

    /* Validate user details */
    const {error} = updateValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    /* Chech email already exist or not */
    const emailexist = await User.findOne({email: req.body.email});
    if(emailexist)  res.status(400).send('Email Already Exists');

    /* Ebcrypt the password */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const updateDetails = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }

    try {
        const updateUser = await User.findByIdAndUpdate(userID, updateDetails);
        res.status(200).send({updateDetails: updateUser._id});    
    } catch (error) {
        res.status(400).send({status:"Failed"});
    }
});

router.delete('/delete/:id',verify,async (req,res) => {
    const userID = req.params.id;

    try {
        await User.findByIdAndDelete(userID);
        res.status(200).send({status: "User Deleted Successfully!"}); 
    } catch (error) {
        res.status(400).send({status:"Failed"});
    }
});

module.exports = router;
