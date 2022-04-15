require ('dotenv').config();
import express from 'express';
import config from 'config';
import connectToMongoDB from './utils/connectToMongoDB';
import log from './utils/logger';
import router from './routes'
const app = express();
app.use(router)
const port = config.get('port') || 5000;

app.listen(port, ()=> {
    log.info(`Server started on port ${port}`)
    connectToMongoDB()
})