import mongoose from 'mongoose';
import { ENV } from './env.js';

let mongoMemoryServer = null;

export const connectDB = async () => {
  try {
    let uri = ENV.MONGODB_URI;

    if (!uri) {
      if (ENV.NODE_ENV === 'production') {
        throw new Error('FATAL: MONGODB_URI is required in production. In-memory fallback is disabled for security and data persistence.');
      }
      console.log('⚡ No MONGODB_URI provided. Initializing in-memory MongoDB fallback (dev/test only)...');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create({
        instance: {
          dbName: 'vidhya_advance'
        }
      });
      uri = mongoMemoryServer.getUri();
      console.log(`✅ In-memory MongoDB running at: ${uri}`);
    }

    await mongoose.connect(uri, {
      autoIndex: true,
    });

    console.log(` MongoDB Connected successfully: ${mongoose.connection.host || 'MemoryDB'}`);
    return mongoose.connection;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (ENV.NODE_ENV === 'production') {
      process.exit(1);
    }
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongoMemoryServer) {
      await mongoMemoryServer.stop();
    }
  } catch (error) {
    console.error('Error disconnecting MongoDB:', error);
  }
};
