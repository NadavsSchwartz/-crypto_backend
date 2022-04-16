import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

const connectToMongoDB = async () => {
  const db = config.get<string>('mongoURI');
  try {
    await mongoose.connect(db);
    log.info('Conntected to MongoDB');
  } catch (err) {
    process.exit(1);
  }
};
export default connectToMongoDB;
