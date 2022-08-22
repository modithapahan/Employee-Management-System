const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/register', async(req,res) => {


    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        passowrd: hashedPassword
    });

})

module.exports = router;