import { connectDB, disconnectDB } from '../config/db.js';
import { Enquiry } from '../models/Enquiry.js';

const cleanTestData = async () => {
  try {
    await connectDB();
    const result = await Enquiry.deleteMany({
      email: { $regex: '@example\\.com$', $options: 'i' },
    });
    console.log(`🧹 Cleaned ${result.deletedCount} sample/test enquiry records.`);
    await disconnectDB();
    process.exit(0);
  } catch (err) {
    console.error('Failed to clean test data:', err);
    process.exit(1);
  }
};

cleanTestData();
