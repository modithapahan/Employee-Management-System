const mongoose = require('mongoose');
require('dotenv').config();
const logger = require('./logger');

let database;
export const connect = async () => {
    const URL = process.env.MONGODB_URL;

    if(database) return database;

    await mongoose.connect(URL).then((connection)=>{
        database = connection;
        logger.info('Database Connected!');
    }).catch((error)=>{
        logger.error(error.message);
    })
}
