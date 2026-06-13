import app from './app';
import { ENV } from './config/env.config';
import { prisma } from './config/prisma.config';

const startServer = async () => {
  try {
    // 1. Verify Database Connection
    console.log('Verifying Prisma database connection...');
    await prisma.$connect();
    console.log('Database connection verified successfully.');

    // 2. Start Express HTTP Server
    app.listen(ENV.PORT, () => {
      console.log(`[Server] Running in [${ENV.NODE_ENV}] mode on port: ${ENV.PORT}`);
    });
  } catch (error) {
    console.error('Critical: Failed to launch backend server:', error);
    process.exit(1);
  }
};

startServer();
