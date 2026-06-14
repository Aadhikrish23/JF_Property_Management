import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ENV } from './config/env.config';

// Import Middlewares
import { errorHandler } from './middleware/error.middleware';

// Import Module Routes
import dashboardRouter from './modules/dashboard/dashboard.routes';
import propertiesRouter from './modules/properties/properties.routes';
import clientsRouter from './modules/clients/clients.routes';
import viewingsRouter from './modules/viewings/viewings.routes';
import tasksRouter from './modules/tasks/tasks.routes';
import notificationsRouter from './modules/notifications/notifications.routes';
import searchRouter from './modules/search/search.routes';

const app: Application = express();

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'JF Property Management API',
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
  });
});

// 1. Register Global Middlewares

// helmet — sets security-relevant HTTP response headers
app.use(helmet());

// cors — restrict cross-origin access
app.use(cors());

// morgan — HTTP request logger (development only)
if (ENV.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// JSON / URL-encoded body parsers
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

import authRouter from './modules/auth/auth.routes';
import { requireAuth } from './middleware/auth.middleware';

// 2. Register API Module Routes
app.use('/api/v1/auth', authRouter);

app.use('/api/v1/dashboard', requireAuth, dashboardRouter);
app.use('/api/v1/properties', requireAuth, propertiesRouter);
app.use('/api/v1/clients', requireAuth, clientsRouter);
app.use('/api/v1/viewings', requireAuth, viewingsRouter);
app.use('/api/v1/tasks', requireAuth, tasksRouter);
app.use('/api/v1/notifications', requireAuth, notificationsRouter);
app.use('/api/v1/search', requireAuth, searchRouter);

// 3. Centralized Error Handling Middleware (must be registered last)
app.use(errorHandler);

export default app;
