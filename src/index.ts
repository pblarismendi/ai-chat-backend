import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';
import { getAuthRoutes } from './routes/auth.routes';
import { getAIRoutes } from './routes/ai.routes';

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Welcome to AI Chat Backend API',
    documentation: `http://localhost:${port}/api-docs`
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'UP', timestamp: new Date() });
});

// Auth routes
app.use('/api/auth', getAuthRoutes());

// AI routes
app.use('/api/ai', getAIRoutes());

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
  console.log(`API Documentation: http://localhost:${port}/api-docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

export default app;

