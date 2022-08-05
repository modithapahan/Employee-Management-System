const router = require('express').Router();
const detail = require('../models/detail');

router.route('/add').post(async(req,res)=>{
    const {name,age,gender,email,city,salary} = req.body;
    const addDetals = {name,age,gender,email,city,salary};
    const details = new detail(addDetals);

    await details.save().then(()=>{
        res.status(200).send({status:"Added Details Successfully!"});
    }).catch((error)=>{
        console.log(error);
        res.status(404).send({status:"Error"});
    })
})

router.route('/:id').get(async(req,res)=>{
    const userId = req.params.id;

    await detail.findById(userId).then((data)=>{
        res.status(200).send(data);
    }).catch((error)=>{
        console.log(error);
        res.status(404).send({status:"Error"});
    })
})

router.route('/update/:id').put(async (req,res)=>{
    const userId = req.params.id;

    const {name,age,gender,email,city,salary} = req.body;
    const updateDetails = {name,age,gender,email,city,salary}
    const details = new detail(updateDetails);

    await detail.findByIdAndUpdate(userId,details).then((data)=>{
        res.status(200).send({status:"Details updated Successfully!"},data);
    }).catch((error)=>{
        console.log(error);
        res.status(404).send({status:"Error"});
    })
})

router.route('/delete/:id').delete(async (req,res)=>{
    const userId = req.params.id;

    await detail.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"Details deleted Successfully!"});
    }).catch((error)=>{
        console.log(error);
        res.status(404).send({status:"Error"});
    })
})