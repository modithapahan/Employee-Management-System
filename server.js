const express = require('express');
const logger = require('./utils/logger');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./utils/databaseConnection').connect();

/* Import Routes */
const userRouter = require('./routes/users');
const noticeRouter = require('./routes/notices');

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* Use Routes */
app.use('/user', userRouter);
app.use('/notice', noticeRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    logger.info(`App is up & running on PORT ${PORT}`);
});
