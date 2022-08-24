const router = require('express').Router();
const notices = require('../models/notice');
const verify = require('../validations/tokenVerify');
const {noticeValidation} = require('../validations/noticeValidation');

router.post('/add',verify, async(req,res)=> {

    /* Notice Validation */
    const {error} = noticeValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const details = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description
    }

    const newNotice = new notices(details);

    try {
        await newNotice.save();
        res.status(200).send({status: "New Notice Added!"});
    } catch (error) {
        res.status(400).send({status: "Failed"});
    }

});

router.get('/',verify,async(req,res)=>{

    try {
        const noticeDetails = await notices.find();
        res.status(200).send({noticeDetails});

    } catch (error) {
        res.status(400).send('Failed!');
    }
});

router.put('/update/:id', verify, async(req,res) => {
    const noticeID = req.params.id;

    /* Notice Validation */
    const {error} = noticeValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const updateDetails = {
        category: req.body.category,
        title: req.body.title,
        description: req.body.description
    }

    try {
        await notices.findByIdAndUpdate(noticeID, updateDetails);
        res.status(200).send({update: "Details Updated!"})  
    } catch (error) {
        res.status(400).send({status:"Failed"});
    }
});

router.delete('/delete/:id', verify, async(req,res) => {
    const noticeID = req.params.id;

    try {
        await notices.findByIdAndDelete(noticeID);
        res.status(200).send({status: "Notice Deleted Successfully!"}); 
    } catch (error) {
        res.status(400).send({status:"Failed"});
    }
})


module.exports = router;
