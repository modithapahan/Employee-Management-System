const mongoose = require('mongoose');
const {MONGODB_URL} = process.env;

let databse;

exports.dbConnection = async()=>{

    await mongoose.connect(MONGODB_URL).then(() => {
        console.log('Database Connected!');
    }).catch((error)=>{
        console.log(error);
    })
}
