import app from './app.js';
import { connectDB } from './config/db.js';
import { ENV } from './config/env.js';
import { seedInitialData } from './seeds/seed.js';

const startServer = async () => {
  try {
    await connectDB();

    // Auto-seed in development if database is empty
    await seedInitialData();

    const server = app.listen(ENV.PORT, () => {
      console.log(`=======================================================`);
      console.log(`🚀 Vidhya Advance Education Server is running!`);
      console.log(`🌐 Environment: ${ENV.NODE_ENV}`);
      console.log(`📡 URL: http://localhost:${ENV.PORT}`);
      console.log(`🔗 Allowed Client: ${ENV.CLIENT_URL}`);
      console.log(`=======================================================`);
    });

    // Graceful Shutdown
    const shutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        console.log('HTTP server closed.');
        const { disconnectDB } = await import('./config/db.js');
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
