const express = require('express');
const logger = require('./utils/logger');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./utils/databaseConnection').connect();

/* Import Routes */
const userRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* Use Routes */
app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    logger.info(`App is up & running on PORT ${PORT}`);
});
