const router = require('express').Router();
const jwt = require('jsonwebtoken');
const user = require('../models/user');

router.route('/login').post(async (req,res, next) => {
    const {nic, password} = req.body;

    let existinguser;

    try{
        existinguser = await user.findOne({ nic:nic })
    } catch{
        const error = new Error('Error! Something went wrong.');
        return next(error);
    }

    if(!existinguser || existinguser.password !== password){
        const error = new Error('Wrong details please check at once');
        return next(error);
    }
})