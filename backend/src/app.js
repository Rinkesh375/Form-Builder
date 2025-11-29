import express from 'express';
import cors from 'cors';
import formSchemaRoutes from './routes/formSchema.routes.js';
import submissionsRoutes from './routes/submissions.routes.js';
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());

// CORS - allow frontend (adjust origin if needed)
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN || 'http://localhost:3000',
    credentials: true
  })
);

// Routes
app.use('/api/form-schema', formSchemaRoutes);
app.use('/api/submissions', submissionsRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
