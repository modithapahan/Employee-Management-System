const router = require('express').Router();
const verify = require('../validations/tokenVerify');

router.get('/post',verify,(req,res)=> {
    res.json({
        title: "My first Post",
        Description: "Something inside here"
    })
});

module.exports = router;