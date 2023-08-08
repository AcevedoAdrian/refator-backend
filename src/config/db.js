import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const db = await mongoose.connect(process.env.DATABASE, {
      dbName: process.env.NAME_DATABASE,
      useUnifiedTopology: true
    });
    const url = `${db.connection.host}:${db.connection.port}`;
    console.log(`MongoDB conectado en: ${url}`);
  } catch (error) {
    console.error(error);
  }
  // process.on('uncaughtException', error => {
  //   console.error(error);
  //   mongoose.disconnect();
  // });
};

export default connectMongoDB;
