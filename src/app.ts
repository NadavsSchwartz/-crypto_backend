require ('dotenv').config();
import express from 'express';
import config from 'config';
import connectToMongoDB from './utils/connectToMongoDB';
import log from './utils/logger';

const app = express();

const port = config.get('port') || 5000;

app.listen(port, ()=> {
    log.info(`Server started on port ${port}`)
    connectToMongoDB()
})