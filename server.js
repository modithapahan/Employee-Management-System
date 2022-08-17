const express = require('express');
const dotenv = require('dotenv').config();
const database = require('./databse/db');
const bodyParser = require('body-parser');
const cors = require('cors');

/* Routes import */
const userRoute = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* Use routes */
app.use('/user', userRoute);

const PORT = process.env.PORT || 8080;

/* Databse Connection */
database.dbConnection();

app.listen(PORT, ()=> {
    console.log(`Server up & running on port ${PORT}`);
});
