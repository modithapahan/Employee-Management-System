const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyparser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyparser.json());

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(()=>{
    console.log('Database Connected!');
}).catch((error) => {
    console.log(error);
})

app.listen(PORT, function(error){
    if(error){
        console.log(error);
    }
    else{
        console.log(`App is running on ${PORT}`);
    }
})
